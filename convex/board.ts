import { UserIdentity } from "convex/server";
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { z } from "zod";
import { Id } from "./_generated/dataModel";

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
  "/placeholders/10.svg",
  "/placeholders/11.svg",
  "/placeholders/12.svg",
  "/placeholders/13.svg",
  "/placeholders/14.svg",
  "/placeholders/15.svg",
  "/placeholders/16.svg",
  "/placeholders/17.svg",
  "/placeholders/18.svg",
  "/placeholders/19.svg",
  "/placeholders/20.svg",
  "/placeholders/21.svg",
  "/placeholders/22.svg",
  "/placeholders/23.svg",
  "/placeholders/24.svg",
  "/placeholders/25.svg",
  "/placeholders/26.svg",
  "/placeholders/27.svg",
  "/placeholders/28.svg",
  "/placeholders/29.svg",
  "/placeholders/30.svg",
  "/placeholders/31.svg",
  "/placeholders/32.svg",
  "/placeholders/33.svg",
  "/placeholders/34.svg",
  "/placeholders/35.svg",
  "/placeholders/36.svg",
  "/placeholders/37.svg",
  "/placeholders/38.svg",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name as string,
      imageUrl: randomImage,
    });

    return board;
  },
});

export const remove = mutation({
  args: {
    orgId: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.orgId);
  },
});

const titleSchema = z
  .string()
  .trim()
  .min(3, "Title must be at least 3 characters long")
  .max(60, "Title must be at most 100 characters long");

const argsSchema = z.object({
  orgId: z.string(), // Assuming orgId is a string, adjust if it's different
  title: titleSchema,
});

export const update = mutation({
  args: {
    orgId: v.id("boards"),
    title: v.string(),
  },
  handler: (ctx, args) => {
    const identity = ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const { success, data } = argsSchema.safeParse(args);

    if (!success) {
      throw new Error("Invalid Arguments");
    }

    const board = ctx.db.patch(data.orgId as Id<"boards">, {
      title: data.title,
    });

    return board;
  },
});

export const favorite = mutation({
  args: {
    id: v.id("boards"),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("no board found with that id");
    }

    const userId = identity.subject;

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    return board;
  },
});

export const unFavorite = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("no board found with that id");
    }

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_board_and_user", (q) =>
        q.eq("boardId", board._id).eq("userId", identity.subject)
      )
      .unique();

    if (!existingFavorite) {
      throw new Error("Favorited board not found");
    }

    await ctx.db.delete(existingFavorite._id);

    return board;
  },
});

export const get = query({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    return board;
  },
});
