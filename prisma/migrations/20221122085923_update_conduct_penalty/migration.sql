/*
  Warnings:

  - The `penalty` column on the `CodeOfConductName` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CodeOfConductName" DROP COLUMN "penalty",
ADD COLUMN     "penalty" INTEGER NOT NULL DEFAULT 0;
