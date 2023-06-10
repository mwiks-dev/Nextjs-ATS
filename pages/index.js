"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <div>
        <h1>Hello, {session.user.name}!</h1> <br/>
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