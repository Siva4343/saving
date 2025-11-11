import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // Redirect if no email is provided
  useEffect(() => {
    if (!email) {
      navigate("/register", { replace: true });
    }
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://127.0.0.1:8000/verify-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Account verified successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://127.0.0.1:8000/resend-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message || "OTP resent successfully!");
    } catch (error) {
      setMessage("Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the OTP sent to {email}
          </p>
        </div>
        <form onSubmit={handleVerify} className="mt-8 space-y-6">
          <div>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit OTP"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              required
              maxLength={6}
              pattern="\d{6}"
            />
          </div>

          {message && (
            <p className={`text-sm text-center ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}>
              {message}
            </p>
          )}

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading || otp.length !== 6
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isLoading}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;