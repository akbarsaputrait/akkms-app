/*
  Warnings:

  - The values [DISTRUPTIVE] on the enum `Violationlevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Violationlevel_new" AS ENUM ('MINOR', 'DISRUPTIVE', 'MODERATE', 'SERIOUS', 'MAJOR');
ALTER TYPE "Violationlevel" RENAME TO "Violationlevel_old";
ALTER TYPE "Violationlevel_new" RENAME TO "Violationlevel";
DROP TYPE "Violationlevel_old";
COMMIT;
