import { initDb } from "./initDb";
import { run } from "./dbClient";

async function seed() {
  await initDb();

  console.log("Seed started");
 const now = new Date().toISOString();
  await run(`
    DELETE FROM Reviews;
  `);

  await run(`
    DELETE FROM Resources;
  `);

  await run(`
    DELETE FROM Users;
  `);

await run(`
  INSERT INTO Users (
    email,
    name,
    createdAt
  )
  VALUES
    (
      'ivan@example.com',
      'Ivan Petrenko',
      '${now}'
    ),
    (
      'olena@example.com',
      'Olena Shevchenko',
      '${now}'
    );
`);

  await run(`
    INSERT INTO Resources
    (
      title,
      author,
      type,
      rating,
      comment,
      createdAt
    )
    VALUES
      (
        'Node.js Guide',
        'John Smith',
        'book',
        5,
        'Useful backend book',
        '${new Date().toISOString()}'
      ),
      (
        'TypeScript Basics',
        'Anna Brown',
        'course',
        4,
        'Good for beginners',
        '${new Date().toISOString()}'
      ),
      (
        'SQLite Tutorial',
        'Mike White',
        'article',
        5,
        'Short and clear',
        '${new Date().toISOString()}'
      );
  `);

  await run(`
    INSERT INTO Reviews
    (
      resourceId,
      userId,
      text,
      rating,
      createdAt
    )
    VALUES
      (
        1,
        1,
        'Very useful resource',
        5,
        '${new Date().toISOString()}'
      ),
      (
        1,
        2,
        'Helped me understand Node',
        4,
        '${new Date().toISOString()}'
      ),
      (
        2,
        1,
        'Good explanation',
        4,
        '${new Date().toISOString()}'
      ),
      (
        3,
        2,
        'SQLite is explained simply',
        5,
        '${new Date().toISOString()}'
      ),
      (
        3,
        1,
        'Nice examples',
        5,
        '${new Date().toISOString()}'
      );
  `);

  console.log("Seed completed");
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});