
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from "axios";

const ResetPasswordPage = () => {
  const { resetToken } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validToken, setValidToken] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const token = Array.isArray(resetToken) ? resetToken[0] : resetToken;
        const response = await axios.post("/api/validate-reset-token", { resetToken: token });

        if (response.status === 200) {
          setValidToken(true);
        } else {
          setError('Invalid or expired reset token');
        }
      } catch (error) {
        console.error('Error validating reset token:', error);
        setError('Error validating reset token');
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [resetToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character");
      return;
    }

    try {
      const response = await axios.post("/api/changingpassword", { resetToken: resetToken, newPassword: password });

      if (response.status === 200) {
        setError("");
        setSuccess("Password reset successfully");
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError("Failed to reset password");
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError("Error resetting password");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 flex flex-col w-full max-w-[1600px] p-5 sm:p-10 min-h-[calc(100vh-80px)] justify-center gap-2 relative">
      <form onSubmit={handleSubmit} className="animate-in flex-1 flex flex-col w-full max-w-96 m-auto mt-10 sm:mt-0 justify-center gap-3 text-foreground">
        <p className="text-3xl font-bold text-center">Reset Password</p>
        <br />
        <div className="relative">
          <label htmlFor="password" hidden>New Password</label>
          <label htmlFor="password" className='absolute right-2 top-[20%] icon flex items-center text-xl cursor-pointer p-2' onClick={() => setPasswordShow(!passwordShow)}>
            {passwordShow && <svg width={20} height={20} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-eye">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>}
            {!passwordShow && <svg width={20} height={20} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.7649 6.07595C14.9991 6.22231 15.0703 6.53078 14.9239 6.76495C14.4849 7.46742 13.9632 8.10644 13.3702 8.66304L14.5712 9.86405C14.7664 10.0593 14.7664 10.3759 14.5712 10.5712C14.3759 10.7664 14.0593 10.7664 13.8641 10.5712L12.6011 9.30816C11.8049 9.90282 10.9089 10.3621 9.93374 10.651L10.383 12.3276C10.4544 12.5944 10.2961 12.8685 10.0294 12.94C9.76266 13.0115 9.4885 12.8532 9.41703 12.5864L8.95916 10.8775C8.48742 10.958 8.00035 10.9999 7.5 10.9999C6.99964 10.9999 6.51257 10.958 6.04082 10.8775L5.58299 12.5864C5.51153 12.8532 5.23737 13.0115 4.97063 12.94C4.7039 12.8685 4.5456 12.5944 4.61706 12.3277L5.06624 10.651C4.09111 10.3621 3.19503 9.90281 2.3989 9.30814L1.1359 10.5711C0.940638 10.7664 0.624058 10.7664 0.428797 10.5711C0.233537 10.3759 0.233537 10.0593 0.428797 9.86404L1.62982 8.66302C1.03682 8.10643 0.515113 7.46742 0.0760677 6.76495C-0.0702867 6.53078 0.000898544 6.22231 0.235064 6.07595C0.46923 5.9296 0.777703 6.00078 0.924057 6.23495C1.40354 7.00212 1.989 7.68056 2.66233 8.2427C2.67315 8.25096 2.6837 8.25971 2.69397 8.26897C4.00897 9.35527 5.65536 9.9999 7.5 9.9999C10.3078 9.9999 12.6563 8.50629 14.0759 6.23495C14.2223 6.00078 14.5308 5.9296 14.7649 6.07595Z"
                fill="#000000"
              />
            </svg>}
          </label>
          <input
            type={passwordShow ? "text" : "password"}
            placeholder="New Password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white p-4 rounded-lg transition-all w-full outline-none ring-0 border hover:border-gray-400 focus:border-rose-600"
          />
        </div>
        <div className="relative">
          <label htmlFor="password" hidden>New Password</label>
          <label htmlFor="password" className='absolute right-2 top-[20%] icon flex items-center text-xl cursor-pointer p-2' onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}>
            {confirmPasswordShow && <svg width={20} height={20} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-eye">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>}
            {!confirmPasswordShow && <svg width={20} height={20} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.7649 6.07595C14.9991 6.22231 15.0703 6.53078 14.9239 6.76495C14.4849 7.46742 13.9632 8.10644 13.3702 8.66304L14.5712 9.86405C14.7664 10.0593 14.7664 10.3759 14.5712 10.5712C14.3759 10.7664 14.0593 10.7664 13.8641 10.5712L12.6011 9.30816C11.8049 9.90282 10.9089 10.3621 9.93374 10.651L10.383 12.3276C10.4544 12.5944 10.2961 12.8685 10.0294 12.94C9.76266 13.0115 9.4885 12.8532 9.41703 12.5864L8.95916 10.8775C8.48742 10.958 8.00035 10.9999 7.5 10.9999C6.99964 10.9999 6.51257 10.958 6.04082 10.8775L5.58299 12.5864C5.51153 12.8532 5.23737 13.0115 4.97063 12.94C4.7039 12.8685 4.5456 12.5944 4.61706 12.3277L5.06624 10.651C4.09111 10.3621 3.19503 9.90281 2.3989 9.30814L1.1359 10.5711C0.940638 10.7664 0.624058 10.7664 0.428797 10.5711C0.233537 10.3759 0.233537 10.0593 0.428797 9.86404L1.62982 8.66302C1.03682 8.10643 0.515113 7.46742 0.0760677 6.76495C-0.0702867 6.53078 0.000898544 6.22231 0.235064 6.07595C0.46923 5.9296 0.777703 6.00078 0.924057 6.23495C1.40354 7.00212 1.989 7.68056 2.66233 8.2427C2.67315 8.25096 2.6837 8.25971 2.69397 8.26897C4.00897 9.35527 5.65536 9.9999 7.5 9.9999C10.3078 9.9999 12.6563 8.50629 14.0759 6.23495C14.2223 6.00078 14.5308 5.9296 14.7649 6.07595Z"
                fill="#000000"
              />
            </svg>}
          </label>
          <input
            type={confirmPasswordShow ? "text" : "password"}
            placeholder="Confirm New Password"
            name="confirm-password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-white p-4 rounded-lg transition-all w-full outline-none ring-0 border hover:border-gray-400 focus:border-rose-600"
          />
        </div>
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
        {success && <p className="text-center text-sm text-green-500">{success}</p>}
        <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-lg flex justify-center items-center gap-2 transition-all active:scale-95 group" disabled={loading}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
