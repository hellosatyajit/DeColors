"use client"
import Link from "next/link";
import GoBack from "@/components/GoBack";
import { useState } from "react";
import axios from "axios";

export default function forgotpassword({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: ""
  });

  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      if (!user.email) {
        setError("Please enter email");
        return;
      }
      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(user.email)) {
        setError("Invalid email ID");
        return;
      }
      const res = await axios.post("/api/reset-password", user);
      if (res.status === 200 || res.status === 201) {
        setMessage("Check your email for the reset link.");
      }
    } catch (error) {
      setError("An error occurred while sending the reset link. Please try again.");
    } finally {
      setLoading(false);
      setUser({ email: "" });
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  return (
    <div className="flex-1 flex flex-col w-full max-w-[1600px] p-5 sm:p-10 min-h-[calc(100vh-80px)] justify-center gap-2 relative">
      <GoBack />
      <form onSubmit={handleResetPassword} className="animate-in flex-1 flex flex-col w-full max-w-96 m-auto mt-10 sm:mt-0 justify-center gap-3 text-foreground">
        <p className="text-3xl font-bold text-center">Forgot Password</p>
        <p className="text-center text-sm">
          We will send you an email link. You will log in with that link. Then from account settings, you can change your password.
        </p>
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
        {message && <p className="text-center text-sm text-green-500">{message}</p>}
        <div>
          <label htmlFor="email" hidden>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleInputChange}
            required
            className="bg-white p-4 rounded-lg transition-all w-full outline-none ring-0 border hover:border-gray-400 focus:border-rose-600"
          />
        </div>
        <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-lg flex justify-center items-center gap-2 transition-all active:scale-95 group" disabled={loading}>
          {loading ? "Sending..." : "Request Reset Link"}
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
