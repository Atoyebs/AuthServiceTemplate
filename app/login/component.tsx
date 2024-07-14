"use client"
import { useState } from "react"
import EmailPassword from "supertokens-web-js/recipe/emailpassword";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

export const
  LoginClientComponent = () => {


    const { push } = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true);


    const onLogin = async () => {
      setIsLoading(true);
      try {
        const response = await EmailPassword.signIn({
          formFields: [
            { id: "email", value: email },
            { id: "password", value: password }
          ]
        });
        console.log(`response in login: `, response);
        if (response.status === "OK") {
          setIsEnabled(false);
          alert("Login Successful. Click on a user page link to test route protection");
          revalidatePath("/user/server");
          revalidatePath("/login")
          setTimeout(() => {
            push("/user/server");
          }, 1000);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    return <section className="page-full justify-center items-center">
      <h1>Login Page</h1>
      <div style={{ gap: '2rem', width: "30vw" }} className="flex-col">
        <input
          placeholder="email"
          value={email}
          disabled={!isEnabled}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          disabled={!isEnabled}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div
        style={{ marginTop: "3rem", marginBottom: "1rem" }}
        className="flex-col justify-center items-center"
      >
        <button onClick={onLogin} disabled={isLoading || !isEnabled} style={{ width: "30vw" }}>
          Log In
        </button>
      </div>
      <div style={{ marginTop: '1.5rem', gap: '2rem' }} className="flex-row">
        <Link href="/">Home</Link>
        <Link href="/signup">SignUp</Link>
        <Link href="/user/client">User page (client)</Link>
        <Link href="/user/server">User page (server)</Link>
      </div>

    </section>;
  }