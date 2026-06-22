import { run } from "./dbClient";

export async function initDb() {

  await run("PRAGMA foreign_keys = ON;");

  await run(`
  CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      createdAt TEXT NOT NULL
  );
  `);

  await run(`
  CREATE TABLE IF NOT EXISTS Resources (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      type TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
      comment TEXT,
      createdAt TEXT NOT NULL
  );
  `);

  await run(`
  CREATE TABLE IF NOT EXISTS Reviews (
  id INTEGER PRIMARY KEY,
  resourceId INTEGER NOT NULL,
  userId INTEGER NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  createdAt TEXT NOT NULL,
  FOREIGN KEY (resourceId) REFERENCES Resources(id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);
  `);

  console.log("DB schema initialized");
}