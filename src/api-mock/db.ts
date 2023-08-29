import initSqlJs from 'sql.js';
import { parse } from 'yaml';

import seederYaml from './seeder_data.yaml?raw';

const SQL = await initSqlJs({
  locateFile(file) {
    return `/node_modules/sql.js/dist/${file}`;
  },
});

// Create the mock database
const db = new SQL.Database();

// Ensure proper tables are created
db.run(`
  CREATE TABLE IF NOT EXISTS "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" VARCHAR(127) NOT NULL,
    "lastName" VARCHAR(127) NOT NULL,
    "emailAddress" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS "Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "estimatedTime" VARCHAR(127),
    "materialsNeeded" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    FOREIGN KEY(userId) REFERENCES User(id)
  );
`);

// Seed mock DB with course and user data
const seedData = parse(seederYaml);

for (const user of seedData.users) {
  db.run(
    `INSERT INTO "User" ("firstName", "lastName", "emailAddress", "password")
    VALUES (:firstName, :lastName, :emailAddress, :password)`,
    {
      ':firstName': user.firstName,
      ':lastName': user.lastName,
      ':emailAddress': user.emailAddress,
      ':password': user.password, // Don't try this at home kids
    },
  );
}

for (const course of seedData.courses) {
  db.run(
    `INSERT INTO "Course" ("title", "description", "estimatedTime", "materialsNeeded", "userId")
    VALUES (:title, :description, :estimatedTime, :materialsNeeded, :userId)`,
    {
      ':title': course.title,
      ':description': course.description,
      ':estimatedTime': course.estimatedTime ?? null,
      ':materialsNeeded': course.materialsNeeded ?? null,
      ':userId': course.userId,
    },
  );
}

export default db;
