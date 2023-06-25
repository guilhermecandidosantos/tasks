-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gitHubId" INTEGER NOT NULL,
    "username" INTEGER NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_gitHubId_key" ON "users"("gitHubId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
