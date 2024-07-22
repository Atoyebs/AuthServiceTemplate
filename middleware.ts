import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SessionContainer } from "supertokens-node/recipe/session";
import { withSession } from "supertokens-node/nextjs";
import { ensureSuperTokensInit } from "./app/config/supertokens/backend";
import { getBearerToken } from "./app/utility/request";
import { EnvHandler, JWTHandler } from "supertokens-jwt-helper";

ensureSuperTokensInit();

export async function middleware(request: NextRequest & { session?: SessionContainer }) {
  const res = NextResponse.next();

  const origin = request.headers.get("origin");

  console.log(`origin = `, origin);

  res.headers.append("Access-Control-Allow-Credentials", "true");
  res.headers.append("Access-Control-Allow-Origin", origin!); // replace this your actual origin
  res.headers.append("Access-Control-Allow-Methods", "GET,OPTIONS,DELETE,PATCH,POST,PUT");
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, fdi-version, st-auth-mode, rid"
  );

  const isUserProtectedPage = request.nextUrl.pathname.startsWith("/user");
  const isAuthApiRoute = request.nextUrl.pathname.startsWith("/api/auth");
  const isServiceApiRoute = request.nextUrl.pathname.startsWith("/api/service");

  if (request.headers.has("x-user-id")) {
    console.warn(
      "The FE tried to pass x-user-id, which is only supposed to be a backend internal header. Ignoring."
    );
    request.headers.delete("x-user-id");
  }

  if (isAuthApiRoute) {
    // this hits our app/api/auth/* endpoints
    return res;
  }

  if (isServiceApiRoute) {
    const bearerToken = getBearerToken(request);
    //if the bearer token is not present, return an error of missing token
    if (!bearerToken) {
      return NextResponse.json({ success: false, message: "Missing Token" }, { status: 400 });
    }

    EnvHandler.getInstance().setEnvs(process.env);
    const handler = JWTHandler.getInstance();
    const [decodedJwt, wasSuccessfullyDecoded] = await handler.decodeJWT(bearerToken);

    const payload = decodedJwt.payload;

    if (!wasSuccessfullyDecoded || payload?.source !== "microservice") {
      return NextResponse.json({ success: false, message: "Unauthorized Access" }, { status: 401 });
    }

    return res;
  }

  return withSession(
    request,
    async (err, session) => {
      if (err) {
        return NextResponse.json(err, { status: 500 });
      }
      if (session === undefined) {
        // return NextResponse.next();
        if (isUserProtectedPage) {
          return NextResponse.redirect(new URL("/login", request.url));
        }

        return res;
      }
      res.headers.set("x-user-id", session.getUserId());
      return res;
    },
    { sessionRequired: false }
  );
}

export const config = {
  matcher: ["/api/:path*", "/user/:path*"],
  unstable_allowDynamic: [
    "/node_modules/lodash/**",
    "/node_modules/lodash*/**",
    "/node_modules/pg-promise/**",
  ],
};
