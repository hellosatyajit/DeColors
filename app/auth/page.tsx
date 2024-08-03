'use client';
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const AuthCallback = () => {

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
        
      if (session.user.isFirstTimeUser) {
        redirect("/onboarding");
      } else {
        redirect("/");
      }
    }
  }, [session, status]);

  return <div>Loading...</div>;
};

export default AuthCallback;