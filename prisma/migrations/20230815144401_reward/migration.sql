-- CreateEnum
CREATE TYPE "UserCondeOfConductType" AS ENUM ('POSITIVE', 'NEGATIVE');

-- DropForeignKey
ALTER TABLE "UserCodeOfConduct" DROP CONSTRAINT "UserCodeOfConduct_codeOfConductId_fkey";

-- AlterTable
ALTER TABLE "UserCodeOfConduct" ADD COLUMN     "rewardId" TEXT,
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "type" "UserCondeOfConductType" NOT NULL DEFAULT 'NEGATIVE',
ALTER COLUMN "codeOfConductId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Reward" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reward_name_key" ON "Reward"("name");

-- AddForeignKey
ALTER TABLE "UserCodeOfConduct" ADD CONSTRAINT "UserCodeOfConduct_codeOfConductId_fkey" FOREIGN KEY ("codeOfConductId") REFERENCES "CodeOfConduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCodeOfConduct" ADD CONSTRAINT "UserCodeOfConduct_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE SET NULL ON UPDATE CASCADE;
