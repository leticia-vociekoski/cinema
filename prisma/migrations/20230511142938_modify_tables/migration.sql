/*
  Warnings:

  - You are about to drop the column `gender` on the `movies` table. All the data in the column will be lost.
  - Added the required column `genre` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterPath` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "MovieWithGender" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "movieId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,
    CONSTRAINT "MovieWithGender_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovieWithGender_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "genres" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "parentalRating" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "synapse" TEXT NOT NULL,
    "posterPath" TEXT NOT NULL
);
INSERT INTO "new_movies" ("director", "duration", "id", "name", "parentalRating", "synapse") SELECT "director", "duration", "id", "name", "parentalRating", "synapse" FROM "movies";
DROP TABLE "movies";
ALTER TABLE "new_movies" RENAME TO "movies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
