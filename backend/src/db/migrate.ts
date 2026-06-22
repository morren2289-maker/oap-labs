import fs from "fs";
import path from "path";

import { all, run } from "./dbClient";

type MigrationRow = {
  filename: string;
};

export async function migrate() {
  await run("PRAGMA foreign_keys = ON;");

  await run(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL UNIQUE,
      appliedAt TEXT NOT NULL
    );
  `);

  const migrationsDir =
    path.join(__dirname, "../migrations");

  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  const applied =
    await all(`
      SELECT filename
      FROM schema_migrations;
    `) as MigrationRow[];

  const appliedSet =
    new Set(applied.map((row) => row.filename));

  for (const file of files) {
    if (appliedSet.has(file)) {
      continue;
    }

    const filePath =
      path.join(migrationsDir, file);

    const sql =
      fs.readFileSync(filePath, "utf8").trim();

    if (!sql) {
      continue;
    }

    await run(sql);

    await run(`
      INSERT INTO schema_migrations (
        filename,
        appliedAt
      )
      VALUES (
        '${file}',
        '${new Date().toISOString()}'
      );
    `);

    console.log(`Migration applied: ${file}`);
  }
}