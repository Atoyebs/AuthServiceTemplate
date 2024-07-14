"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Session from "supertokens-web-js/recipe/session";
import EmailPassword from "supertokens-web-js/recipe/emailpassword";

export const LoginMenuItems = () => {

  const { refresh, push } = useRouter();

  return (
    <div style={{ gap: "1.5rem" }} className="flex-row items-center">
      <Link
        onClick={async (e) => {
          e.preventDefault();
          await Session.signOut();
          await EmailPassword.signOut();
          refresh();
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