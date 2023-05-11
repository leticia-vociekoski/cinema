/*
  Warnings:

  - You are about to drop the column `genre` on the `movies` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "parentalRating" TEXT NOT NULL,
    "synapse" TEXT NOT NULL,
    "posterPath" TEXT NOT NULL
);
INSERT INTO "new_movies" ("director", "duration", "id", "name", "parentalRating", "posterPath", "synapse") SELECT "director", "duration", "id", "name", "parentalRating", "posterPath", "synapse" FROM "movies";
DROP TABLE "movies";
ALTER TABLE "new_movies" RENAME TO "movies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
