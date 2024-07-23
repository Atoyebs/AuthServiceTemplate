import { ensureSuperTokensInit } from "@/app/config/supertokens/backend";
import { NextRequest, NextResponse } from "next/server";
import Session from "supertokens-node/recipe/session";

ensureSuperTokensInit();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const token = body.token;

  // console.log(`token in /user/info = `, token);

  if (!token) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const session = await Session.getSessionWithoutRequestResponse(token);
    console.log(`session in /user/info = `, session);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const sessionInfo = session.getAccessTokenPayload();
    return NextResponse.json({ success: true, data: sessionInfo }, { status: 200 });
  } catch (error) {
    console.log(`error in /user/info = `, error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
