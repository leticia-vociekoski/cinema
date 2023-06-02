/*
  Warnings:

  - You are about to drop the `MovieWithGender` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sessionTypes` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MovieWithGender";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "MovieWithGenre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "movieId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,
    CONSTRAINT "MovieWithGenre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovieWithGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hour" DATETIME NOT NULL,
    "movieId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "sessionTypes" TEXT NOT NULL,
    CONSTRAINT "sessions_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sessions_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sessions" ("hour", "id", "movieId", "roomId") SELECT "hour", "id", "movieId", "roomId" FROM "sessions";
DROP TABLE "sessions";
ALTER TABLE "new_sessions" RENAME TO "sessions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
