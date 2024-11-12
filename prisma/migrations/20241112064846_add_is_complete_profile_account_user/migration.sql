/*
  Warnings:

  - The values [EstateCompany] on the enum `UserModel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserModel_new" AS ENUM ('EstateCompanyAgent', 'Client', 'Admin');
ALTER TABLE "User" ALTER COLUMN "model" TYPE "UserModel_new" USING ("model"::text::"UserModel_new");
ALTER TYPE "UserModel" RENAME TO "UserModel_old";
ALTER TYPE "UserModel_new" RENAME TO "UserModel";
DROP TYPE "UserModel_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isCompleteProfileAccount" BOOLEAN NOT NULL DEFAULT false;
