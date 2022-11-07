/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "RefreshTokens" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(255) NOT NULL,

    CONSTRAINT "RefreshTokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshTokens_token_key" ON "RefreshTokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
