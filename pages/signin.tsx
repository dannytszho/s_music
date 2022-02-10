import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Signin = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/app");
    }
  }, [session, router]);

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("github")}>Sign in</button>
    </>
  );
};

export default Signin;
