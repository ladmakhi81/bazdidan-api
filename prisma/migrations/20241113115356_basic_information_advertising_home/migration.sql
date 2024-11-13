/*
  Warnings:

  - Added the required column `hasBalcony` to the `AdvertisingHome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasElevator` to the `AdvertisingHome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasParking` to the `AdvertisingHome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasStoreRoom` to the `AdvertisingHome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meterage` to the `AdvertisingHome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `AdvertisingHome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomCount` to the `AdvertisingHome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `AdvertisingHome` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AdvertisingHomeType" AS ENUM ('Mortage', 'Buy', 'Rent');

-- AlterTable
ALTER TABLE "AdvertisingHome" ADD COLUMN     "hasBalcony" BOOLEAN NOT NULL,
ADD COLUMN     "hasElevator" BOOLEAN NOT NULL,
ADD COLUMN     "hasParking" BOOLEAN NOT NULL,
ADD COLUMN     "hasStoreRoom" BOOLEAN NOT NULL,
ADD COLUMN     "meterage" INTEGER NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "roomCount" INTEGER NOT NULL,
ADD COLUMN     "type" "AdvertisingHomeType" NOT NULL;
