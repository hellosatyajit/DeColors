import Link from "next/link";
import GoBack from "@/components/GoBack";
import { forgotPassword } from "@/utils/auth";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex-1 flex flex-col w-full max-w-[1600px] p-5 sm:p-10 min-h-[calc(100vh-80px)] justify-center gap-2 relative">
      <GoBack />
      <form action={forgotPassword} className="animate-in flex-1 flex flex-col w-full max-w-96 m-auto mt-10 sm:mt-0 justify-center gap-3 text-foreground">
        <p className="text-3xl font-bold text-center">Forgot Password</p>
        <p className="text-center text-sm">
          We will send you email link, you will be login with that link. Then from account setting you can change your password.
        </p>
        <div>
          <label htmlFor="email" hidden>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            required
            className="bg-white p-4 rounded-lg transition-all w-full outline-none ring-0 border hover:border-gray-400 focus:border-rose-600"
          />
        </div>
        <button className="bg-rose-600  hover:bg-rose-700 text-white p-4 rounded-lg flex justify-center items-center gap-2 transition-all active:scale-95 group">
          Request Reset Link
        </button>
        <p className="text-center text-sm mt-2">
          <Link href="/login" className="font-medium hover:underline">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}
