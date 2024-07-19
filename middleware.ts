import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SessionContainer } from "supertokens-node/recipe/session";
import { withSession } from "supertokens-node/nextjs";
import { ensureSuperTokensInit } from "./app/config/supertokens/backend";

ensureSuperTokensInit();

export async function middleware(request: NextRequest & { session?: SessionContainer }) {
  if (request.headers.has("x-user-id")) {
    console.warn(
      "The FE tried to pass x-user-id, which is only supposed to be a backend internal header. Ignoring."
    );
    request.headers.delete("x-user-id");
  }

  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    // this hits our app/api/auth/* endpoints
    return NextResponse.next();
  }

  return withSession(
    request,
    async (err, session) => {
      if (err) {
        return NextResponse.json(err, { status: 500 });
      }
      if (session === undefined) {
        // return NextResponse.next();
        if (request.nextUrl.pathname.startsWith("/user")) {
          return NextResponse.redirect(new URL("/login", request.url));
        }

        return NextResponse.next();
      }
      return NextResponse.next({
        headers: {
          "x-user-id": session.getUserId(),
        },
      });
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
