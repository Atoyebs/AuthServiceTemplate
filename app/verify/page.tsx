import { ServerComponentProps } from "@/app/types";
import Link from "next/link";
import EmailVerification from 'supertokens-node/recipe/emailverification';


const VerifyPage = async (props: ServerComponentProps) => {

  const { searchParams } = props;
  const token = searchParams?.token;

  const { status, ...rest } = await verifyEmailServerSide(token);

  if (!token || status !== "OK") {
    return <section className="page-full justify-center items-center">
      <div>Verify page</div>
      <div>Invalid token</div>
    </section>;
  }

  return <section style={{ gap: '2rem' }} className="page-full justify-center items-center">
    <h1>Verify page</h1>
    <div>Congratulations you've been successfully verified</div>
    <div>User data: {JSON.stringify(rest)}</div>
    <span><Link href={"/login"}>Login</Link></span>
  </section>;
}

const verifyEmailServerSide = async (token: string) => {

  const response = await EmailVerification.verifyEmailUsingToken("public", token);
  return response;

}

export default VerifyPage;