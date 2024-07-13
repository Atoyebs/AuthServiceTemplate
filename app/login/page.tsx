"use client"
import { useActionState, useState } from "react"
import EmailPassword from "supertokens-web-js/recipe/emailpassword";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    setIsLoading(true);
    try {
      let response = await EmailPassword.signIn({
        formFields: [
          { id: "email", value: email },
          { id: "password", value: password }
        ]
      });
      console.log(`response in login: `, response);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }


  return <section className="page-full justify-center items-center">
    <h1>Login Page</h1>
    <div style={{ gap: '2rem' }} className="flex-col">
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div
      style={{ marginTop: "3rem", marginBottom: "1rem" }}
      className="flex-col justify-center items-center"
    >
      <button onClick={onLogin} disabled={isLoading} style={{ width: "30vw" }}>
        SignUp
      </button>
    </div>

  </section>;
}



export default Login;