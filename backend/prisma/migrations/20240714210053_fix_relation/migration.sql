/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlayerGame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlayerStats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayerGame" DROP CONSTRAINT "PlayerGame_gameId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerGame" DROP CONSTRAINT "PlayerGame_playerId_fkey";

-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_id_fkey";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "PlayerGame";

-- DropTable
DROP TABLE "PlayerStats";

-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL,
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players_games" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "countDeath" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "players_games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players_stats" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "countKill" INTEGER NOT NULL DEFAULT 0,
    "countDeath" INTEGER NOT NULL DEFAULT 0,
    "countAssist" INTEGER NOT NULL DEFAULT 0,
    "countWin" INTEGER NOT NULL DEFAULT 0,
    "countLose" INTEGER NOT NULL DEFAULT 0,
    "countDraw" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "players_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_stats_playerId_key" ON "players_stats"("playerId");

-- AddForeignKey
ALTER TABLE "players_games" ADD CONSTRAINT "players_games_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players_games" ADD CONSTRAINT "players_games_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players_stats" ADD CONSTRAINT "players_stats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
