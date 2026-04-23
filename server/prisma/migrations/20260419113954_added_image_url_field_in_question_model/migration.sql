/*
  Warnings:

  - You are about to drop the column `subject` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Question" DROP COLUMN "subject",
ADD COLUMN     "imageUrl" TEXT;
