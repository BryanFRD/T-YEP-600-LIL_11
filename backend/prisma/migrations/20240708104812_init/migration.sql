-- CreateTable
CREATE TABLE "players" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "firstname" TEXT,
    "password" TEXT,
    "username" TEXT,
    "lastConnection" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerGame" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "countDeath" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PlayerGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerStats" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "countKill" INTEGER NOT NULL,
    "countDeath" INTEGER NOT NULL,
    "countAssist" INTEGER NOT NULL,
    "countWin" INTEGER NOT NULL,
    "countLose" INTEGER NOT NULL,
    "countDraw" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PlayerStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_email_key" ON "players"("email");

-- CreateIndex
CREATE UNIQUE INDEX "players_username_key" ON "players"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerStats_playerId_key" ON "PlayerStats"("playerId");

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_id_fkey" FOREIGN KEY ("id") REFERENCES "PlayerStats"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerGame" ADD CONSTRAINT "PlayerGame_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerGame" ADD CONSTRAINT "PlayerGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
