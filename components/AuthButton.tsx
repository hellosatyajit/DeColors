import Link from "next/link";
import { signOut, getUser } from "@/utils/auth";

export default async function AuthButton() {
  const user = await getUser();

  return <div className="absolute right-0 top-10 flex-col items-center gap-4 hidden group-hover:flex hover:flex">
    <div className="bg-white p-4 rounded-lg w-52 flex flex-col gap-2 mt-2">
      {user ? (
        <>
          <p>Hey, {user.username}!</p>
          <form action={signOut}>
            <button className="py-2 px-4 rounded-md no-underline bg-gray-900 hover:bg-black text-white w-full">
              Logout
            </button>
          </form>
        </>
      ) : (
        <>
          <p>Hey, there!</p>
          <Link
            href="/login"
            className="py-2 px-4 rounded-md no-underline bg-gray-900 hover:bg-black text-white w-full text-center"
          >
            Log In
          </Link>
          <Link
            href="/login"
            className="py-2 px-4 rounded-md no-underline bg-gray-900 hover:bg-black text-white w-full text-center"
          >
            Register
          </Link>
        </>
      )}
    </div>
  </div>
}
