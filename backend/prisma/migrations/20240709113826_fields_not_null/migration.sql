/*
  Warnings:

  - Made the column `name` on table `players` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstname` on table `players` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `players` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `players` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PlayerGame" ALTER COLUMN "countDeath" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "PlayerStats" ALTER COLUMN "countKill" SET DEFAULT 0,
ALTER COLUMN "countDeath" SET DEFAULT 0,
ALTER COLUMN "countAssist" SET DEFAULT 0,
ALTER COLUMN "countWin" SET DEFAULT 0,
ALTER COLUMN "countLose" SET DEFAULT 0,
ALTER COLUMN "countDraw" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "players" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "firstname" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL;
