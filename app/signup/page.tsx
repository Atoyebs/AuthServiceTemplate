"use client";
import Link from "next/link";
import { useState } from "react";

const TUTORIAL_URL =
  "https://supertokens.com/docs/thirdpartyemailpassword/custom-ui/email-password-login";

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstname, setFirstname] = useState("Ini");
  const [lastname, setLastname] = useState("Atoyebi");
  const [email, setEmail] = useState("bakid11888@atebin.com");
  const [password, setPassword] = useState("");

  const onSignUp = async () => {
    setIsLoading(true);
    const body = {
      firstname,
      lastname,
      email,
      password,
    }
    alert(JSON.stringify(body))
    setIsLoading(false);
  };

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <h1 style={{ marginBottom: "3rem" }}>Sign Up (Demo) </h1>

      <div style={{ gap: "1rem", width: "25vw" }} className="flex-col justify-center items-center">
        <input placeholder="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        <input placeholder="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div
        style={{ marginTop: "3rem", marginBottom: "1rem" }}
        className="flex-col justify-center items-center"
      >
        <button onClick={onSignUp} disabled={isLoading} style={{ width: "30vw" }}>
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
