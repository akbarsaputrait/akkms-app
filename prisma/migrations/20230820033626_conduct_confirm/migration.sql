/*
  Warnings:

  - You are about to alter the column `password` on the `Admin` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(255)`.
  - You are about to alter the column `pin` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(255)`.
  - You are about to alter the column `educationYear` on the `UserClass` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(255)`.

*/
-- CreateEnum
CREATE TYPE "UserCondeOfConductStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "pin" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "UserClass" ALTER COLUMN "educationYear" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "UserCodeOfConduct" ADD COLUMN     "status" "UserCondeOfConductStatus" NOT NULL DEFAULT 'APPROVED';
