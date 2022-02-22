import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

const Signin_auth = () => {
  const { data: session, status } = useSession()
  console.log(status)
  const router = useRouter()
  
  useEffect(() => {
      if(session && status !== "loading") {
          router.push('/')
      }
  }, [session, status])

  
  return (
    <>
        Signed in as<br /><pre>{JSON.stringify(session, null, 4)}</pre>
        <button onClick={() => signIn("github")}>Sign in</button><br />
        <button onClick={()=>{signOut()}}>Sign Out</button>
    </>
)}
Signin_auth.auth = true

export default Signin_auth;