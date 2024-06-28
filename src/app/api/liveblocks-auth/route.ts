import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

import { api } from "../../../../convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_R3UhDHVh6pETqr4cUF7abfvukY0WMgyIWcdG05BmaJA0dBGKTrdeJGLN8AGh-xis",
});

const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  if (!auth || !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { room } = await request.json();

  const board = await convex.query(api.board.get, { id: room });

  if (board.orgId !== authorization.orgId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const userInfo = {
    name: user.fullName || "anonymous",
    picture: user.imageUrl,
  };

  const session = liveblocks.prepareSession(user.id, {
    userInfo,
  });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();

  return new Response(body, { status });
}
