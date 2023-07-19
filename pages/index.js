import { useSession, signIn, signOut } from "next-auth/react";
import SendSMSForm from './sendSMSForm';
// import StkPush from "./darajaService";
import RegisterURLs from "./registerForm";
import C2BPayment from "./c2bForm";
import B2CForm from "./b2cForm";

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <div>
        <h1 className='text-3xl text-green-600 p-2'>Hello, {session.user.name}!</h1> <br/>
        <SendSMSForm /><br></br>
        {/* <StkPush /><br></br> */}
        <RegisterURLs /><br></br>
        <C2BPayment /><br></br>
        <B2CForm /><br></br>


        {/* Signed in as {session.user.name} <br /> */}
        <button onClick={() => signOut()}>Sign out</button>
        </div>
      </>
    )
  }
  return (
    <>
    <div>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
    </>
  )
}