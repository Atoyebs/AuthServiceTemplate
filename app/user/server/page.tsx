import { ensureSuperTokensInit } from "@/app/config/supertokens/backend";
import { LoginMenuItems } from "@/app/login/menu-items";
import { cookies } from "next/headers";
import Session from "supertokens-node/recipe/session";

ensureSuperTokensInit();

const UserServer = async () => {

  const sAccessToken = cookies().get('sAccessToken')?.value || "";

  const session = await Session.getSessionWithoutRequestResponse(sAccessToken);
  const sessionInfo = session.getAccessTokenPayload()

  return <section style={{ gap: '2rem' }} className="page-full justify-center items-center">
    <h1>User page for <span style={{ color: "brown" }}>{sessionInfo.firstname} {sessionInfo.lastname}</span></h1>
    <h2>Email: <span style={{ color: "green" }}>{sessionInfo.email}</span></h2>
    <LoginMenuItems />
  </section>;
};



export default UserServer;