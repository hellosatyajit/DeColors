'use client';
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();
  const user = session?.user;

  return <div className="absolute right-0 top-10 flex-col items-center gap-4 hidden group-hover:flex hover:flex z-50">
    <div className="bg-white p-4 rounded-lg w-52 flex flex-col gap-2 mt-2">
      {user ? (
        <>
          <p className="text-black">Hey, {user?.name}!</p>
          <Link
            href="/account/profile"
            className="py-2 px-4 rounded-md no-underline bg-gray-900 hover:bg-black text-white w-full text-center"
          >
            Account
          </Link>
          <form action={()=> signOut()}>
            <button className="py-2 px-4 rounded-md no-underline bg-gray-900 hover:bg-black text-white w-full">
              Logout
            </button>
          </form>
        </>
      ) : (
        <>
          <p className="text-black">Hey, there!</p>
          <Link
            href="/login"
            className="py-2 px-4 rounded-md no-underline bg-gray-900 hover:bg-black text-white w-full text-center"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="py-2 px-4 rounded-md no-underline bg-gray-900 hover:bg-black text-white w-full text-center"
          >
            Register
          </Link>
        </>
      )}
    </div>
  </div>
}
