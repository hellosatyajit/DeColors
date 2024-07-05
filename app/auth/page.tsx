'use client';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const AuthCallback = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(status)
    if (status === "authenticated") {
        
      if (session.user.isFirstTimeUser) {
        router.push("/onboarding");
      } else {
        router.push("/");
      }
    }
  }, [session, status, router]);

  return <div>Loading...</div>;
};

export default AuthCallback;