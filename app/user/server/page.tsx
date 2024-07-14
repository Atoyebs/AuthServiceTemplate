import { LoginMenuItems } from "@/app/login/menu-items";
import { getSSRSessionHelper } from "@/app/utility/sessions";
import { redirect } from 'next/navigation';


const UserServer = async () => {

  const { accessTokenPayload, error } = await getSSRSessionHelper();
  console.log(`accessTokenPayload in user server page = `, accessTokenPayload);
  console.log(`error in user server page = `, error);

  //if access token doesn't exist OR there is an error getting the accessToken, redirect to login page
  if (!accessTokenPayload || error) {
    redirect("/login");
  }

  return <section style={{ gap: '2rem' }} className="page-full justify-center items-center">
    <h1>User page for {accessTokenPayload.firstname} {accessTokenPayload.lastname} <span style={{ color: "gray" }}>(Server)</span></h1>
    <h2>Email: <span style={{ color: "blue" }}>{accessTokenPayload.email}</span></h2>
    <LoginMenuItems />
  </section>;
};

export default UserServer;