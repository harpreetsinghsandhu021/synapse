"use server";

import { prisma } from "@/lib/prisma";

export async function getDocument(boardId: string) {
  try {
    const document = await prisma.document.findFirst({
      where: {
        boardId,
      },
    });

    if (document) {
      return { document, status: 200 };
    }
  } catch (err: any) {
    return { err: err, status: err.status || 500 };
  }
}

export async function createDocument(boardId: string) {
  try {
    const newDoc = await prisma.document.create({
      data: {
        boardId,
        json: "",
      },
    });

    console.log(newDoc);

    if (newDoc) {
      return { status: 201 };
    }
  } catch (err: any) {
    console.log(err);

    return { err: err, status: err.status || 500 };
  }
}

export async function updateDocument(
  documentId: number,
  json: string,
  boardId: string
) {
  console.log("updating document");

  try {
    const updatedDoc = await prisma.document.upsert({
      where: {
        boardId: boardId,
      },
      update: {
        json: json,
      },
      create: {
        json: json,
        boardId: boardId,
      },
    });

    if (updatedDoc) {
      return { status: 204 };
    }
  } catch (err: any) {
    console.log(err);

    return { err: err, status: err.status || 500 };
  }
}
