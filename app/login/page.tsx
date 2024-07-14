import { redirect } from "next/navigation";
import { getSSRSessionHelper } from "../utility/sessions";
import { LoginClientComponent } from "./component";

const LoginServer = async () => {

  const { accessTokenPayload, error } = await getSSRSessionHelper();
  const hasValidSession = (accessTokenPayload !== undefined) && !error;

  if (hasValidSession) {
    redirect("/user/server");
  }

  return <LoginClientComponent />

}



export default LoginServer;