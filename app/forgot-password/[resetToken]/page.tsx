
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from "axios";

const ResetPasswordPage = () => {
  const { resetToken } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm New Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
