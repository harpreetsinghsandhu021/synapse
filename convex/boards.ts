import { v } from "convex/values";

import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
  args: {
    orgId: v.string(),
    favorites: v.optional(v.string()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    if (args.favorites === "true") {
      const favoriteBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user", (q) => q.eq("userId", identity.subject))
        .order("desc")
        .collect();

      const ids = favoriteBoards.map((favorite) => favorite.boardId);

      return await Promise.all(
        ids.map(async (id) => {
          const res = await ctx.db
            .query("boards")
            .filter((q) => q.eq(q.field("_id"), id))
            .unique();

          return { ...res, isFavorite: true };
        })
      );
    }

    const title = args.search;

    let boards = [];

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    const boardWithFavorite = await Promise.all(
      boards.map(async (board) => {
        const favorite = await ctx.db
          .query("userFavorites")
          .withIndex("by_board_and_user", (q) =>
            q.eq("boardId", board._id).eq("userId", identity.subject)
          )
          .unique();

        return {
          ...board,
          isFavorite: !!favorite, // Convert to boolean
        };
      })
    );

    return boardWithFavorite;
  },
});
