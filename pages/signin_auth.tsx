import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

const Signin_auth = () => {
  const { data: session } = useSession()
  console.log(session)
  const router = useRouter()
  
  useEffect(() => {
      if(session) {
          router.push('/')
      }
  }, [session, router])
  
  return (
    <>
        Signed in as<br />
        <button onClick={() => signIn("github")}>Sign in</button>
    </>
)}
Signin_auth.auth = true

export default Signin_auth;