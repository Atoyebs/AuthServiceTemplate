"use client";
import Link from "next/link";
import { useState } from "react";

const TUTORIAL_URL =
  "https://supertokens.com/docs/thirdpartyemailpassword/custom-ui/email-password-login";

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fistname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <h1 style={{ marginBottom: "3rem" }}>Sign Up (Demo) </h1>

      <div style={{ gap: "1rem", width: "25vw" }} className="flex-col justify-center items-center">
        <input placeholder="firstname" onChange={(e) => setFirstname(e.target.value)} />
        <input placeholder="lastname" onChange={(e) => setLastname(e.target.value)} />
        <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div
        style={{ marginTop: "3rem", marginBottom: "1rem" }}
        className="flex-col justify-center items-center"
      >
        <button disabled={isLoading} style={{ width: "30vw" }}>
          SignUp
        </button>
      </div>

      <span>
        <Link href={TUTORIAL_URL} target="_blank">
          Click here for tutorial instructions
        </Link>
      </span>
    </section>
  );
};

export default SignUp;
