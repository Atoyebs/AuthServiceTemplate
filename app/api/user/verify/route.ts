import { ensureSuperTokensInit } from "@/app/config/supertokens/backend";
import { NextResponse } from "next/server";
import EmailVerification from "supertokens-node/recipe/emailverification";

ensureSuperTokensInit();

export const POST = async (request: Request) => {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ success: false, error: "No token provided" });
  }

  const response = await EmailVerification.verifyEmailUsingToken("public", token);

  return NextResponse.json({ success: true, data: response });
};
