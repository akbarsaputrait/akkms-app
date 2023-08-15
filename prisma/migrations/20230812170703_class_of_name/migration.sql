/*
  Warnings:

  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Todo";

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");
