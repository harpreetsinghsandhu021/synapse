-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "boardId" TEXT NOT NULL,
    "json" JSONB NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);
