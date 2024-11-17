/*
  Warnings:

  - A unique constraint covering the columns `[roomName]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `advertisingHomeId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstUserId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomName` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondUserId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "advertisingHomeId" INTEGER NOT NULL,
ADD COLUMN     "firstUserId" INTEGER NOT NULL,
ADD COLUMN     "roomName" TEXT NOT NULL,
ADD COLUMN     "secondUserId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chat_roomName_key" ON "Chat"("roomName");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_firstUserId_fkey" FOREIGN KEY ("firstUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_secondUserId_fkey" FOREIGN KEY ("secondUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_advertisingHomeId_fkey" FOREIGN KEY ("advertisingHomeId") REFERENCES "AdvertisingHome"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
