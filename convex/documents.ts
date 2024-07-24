import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createDocument = mutation({
  args: { boardId: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.insert("documents", {
      boardId: args.boardId,
      json: "",
      userId: identity.subject,
    });

    return document;
  },
});

export const getDocument = query({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const document = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("boardId"), args.id as string))
      .first();

    if (!document) {
      throw new Error("Document not found");
    }

    return document;
  },
});

export const updateDocument = mutation({
  args: {
    id: v.id("documents"),
    json: v.string(),
  },
  handler: async (ctx, args) => {
    const updatedDocument = await ctx.db.patch(args.id, {
      json: args.json,
    });

    return updatedDocument;
  },
});
