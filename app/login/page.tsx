
import { cookies, headers } from "next/headers";
import { LoginClientComponent } from "./component";
import Session from "supertokens-node/recipe/session";
import { redirect } from "next/navigation";
import { ensureSuperTokensInit } from "../config/supertokens/backend";

ensureSuperTokensInit();

const LoginServer = async () => {

  const sAccessToken = cookies().get("sAccessToken")?.value || "";

  if (!sAccessToken) {
    return <LoginClientComponent />
  }

  const session = await Session.getSessionWithoutRequestResponse(sAccessToken);

  if (session) {
    return redirect("/user/server");
  }

  return <LoginClientComponent />

}



export default LoginServer;