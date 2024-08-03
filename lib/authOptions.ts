// src/authOptions.ts

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "@/server/model/User";
import { User as UserType } from "../types/product";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const user = await findUserByEmail(email);
          if (!user) {
            throw new Error("User not found");
          }
          const passwordsMatch = await bcrypt.compare(password, user.password!);
          if (!passwordsMatch) {
            throw new Error("Incorrect password");
          }
          const userForAuth: UserType = {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
          return userForAuth;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && account.provider === "google") {
        try {
          const email = user?.email || profile?.email || "no-email@example.com";
          const name = user?.name || profile?.name || "Anonymous";
          if (email) {
            const existingUser = await findUserByEmail(email);
            if (!existingUser) {
              const newUser = await createUser({ name: name, email });
              user.id = newUser.insertedId.toString();
              user.isFirstTimeUser = true;
            } else {
              user.id = existingUser._id.toString();
              user.isFirstTimeUser = false;
            }
          }
          return true;
        } catch (err) {
          console.error(err);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, trigger,user,session}) {
      if (trigger === "update" && session) {
        return { ...token, ...session?.user };
      }
      if (user) {
        token.email = user.email || "no-email@example.com";
        token.name = user.name || "Anonymous";
        token.id = user.id;
        token.isFirstTimeUser = user.isFirstTimeUser;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email || "no-email@example.com";
        session.user.name = token.name || "Anonymous";
        session.user.id = token.id;
        session.user.isFirstTimeUser = token.isFirstTimeUser;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/login",
  },
};
