import NextAuth from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    isFirstTimeUser?: boolean;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      isFirstTimeUser?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    isFirstTimeUser?: boolean;
  }
}