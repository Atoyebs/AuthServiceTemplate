import { ensureSuperTokensInit } from "@/app/config/supertokens/backend";
import { NextRequest, NextResponse } from "next/server";
import { withSession } from "supertokens-node/nextjs";
// import Session from "supertokens-node/recipe/session";

ensureSuperTokensInit();

export async function POST(request: NextRequest) {
  return withSession(request, async (err, session) => {
    if (err || !session) {
      return NextResponse.json(err, { status: 500 });
    }
    const userId = session!.getUserId();

    const sessionInfo = session!.getAccessTokenPayload();
    return NextResponse.json({ userId, data: sessionInfo }, { status: 200 });
  });
}
