import { NextRequest } from "next/server";

export const getBearerToken = (request: NextRequest): string => {
  const authHeader = request.headers.get("Authorization");
  const hasBearerStructure = authHeader?.startsWith("Bearer ");
  const token = authHeader?.split(" ")[1];
  if (!hasBearerStructure || !token) {
    return "";
  }
  return token;
};
