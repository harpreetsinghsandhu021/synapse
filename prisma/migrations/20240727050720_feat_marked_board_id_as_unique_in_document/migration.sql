/*
  Warnings:

  - A unique constraint covering the columns `[boardId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Document_boardId_key" ON "Document"("boardId");
