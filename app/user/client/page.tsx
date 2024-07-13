"use client";

import { useSessionHandler } from "@/app/hooks/session-handler";
import EmailPassword from "supertokens-web-js/recipe/emailpassword";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserClient = () => {
  const { push } = useRouter();
  const { isLoading, sessionPayload, doesSessionExist } = useSessionHandler({
    onSessionNotFoundRedirect: () => {
      push("/");
    },
  });

  //if its loading
  if (isLoading) {
    return (
      <section className="page-full justify-center items-center">
        <h1>Loading . . .</h1>
      </section>
    );
  }

  //if loading is finished and session exists
  if (!isLoading && doesSessionExist) {
    return (
      <section className="page-full justify-center items-center">
        <h1 style={{ marginBottom: "2rem" }}>
          User page for {sessionPayload?.firstname} {sessionPayload?.lastname}{" "}
          <span style={{ color: "gray" }}>(Client)</span>
        </h1>
        <span style={{ marginBottom: "2rem" }}>
          <Link
            onClick={async () => {
              await EmailPassword.signOut();
              push("/");
            }}
            href={"#"}
          >
            Log Out
          </Link>
        </span>
        <div style={{ gap: "1rem", marginTop: "1rem" }} className="flex-row">
          <Link href={"/"}>Home</Link>
          <Link href={"/login"}>Login</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-full justify-center items-center">
      <h1>
        No Session Found
        <span style={{ color: "gray" }}>(Client)</span>
      </h1>
      <h2>Now Re-Routing</h2>
    </section>
  );
};

export default UserClient;
