import { NextRequest, NextResponse } from "next/server";
import { EnvHandler, JWTHandler } from "supertokens-jwt-helper";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  const hasBearerStructure = authHeader?.startsWith("Bearer ");
  const token = authHeader?.split(" ")[1];
  if (!hasBearerStructure || !token) {
    return NextResponse.json(
      { success: false, message: "invalid bearer structure" },
      { status: 500 }
    );
  }

  EnvHandler.getInstance().setEnvs(process.env);
  const jwtHandlerInstance = JWTHandler.getInstance();
  const [decodedJWT, isSuccess] = await jwtHandlerInstance.decodeJWT(token);

  if (!isSuccess) {
    return NextResponse.json({ success: false, message: "Unauthorised access" }, { status: 403 });
  }

  return NextResponse.json(
    { success: true, data: decodedJWT, message: "successfully hit verify endpoint" },
    { status: 200 }
  );
}
