/*
  Warnings:

  - A unique constraint covering the columns `[createdAt,id]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Question_createdAt_id_key" ON "public"."Question"("createdAt", "id");
