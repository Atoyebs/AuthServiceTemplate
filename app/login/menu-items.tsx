"use client";

import Link from "next/link";
import Session from "supertokens-web-js/recipe/session";

export const LoginMenuItems = () => {

  return (
    <div style={{ gap: "1.5rem" }} className="flex-row items-center">
      <Link
        onClick={async (e) => {
          e.preventDefault();
          await Session.signOut();
          window.location.href = "/";
        }}
        href={"#"}
      >
        Log Out
      </Link>
      <Link href={"/"}>Home</Link>
      <Link href={"/login"}>Login</Link>
    </div>
  )
}