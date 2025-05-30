"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Verified({ email, onBack }) {
  const router = useRouter();
  useEffect(() => {
    if (email) {
      localStorage.setItem("registeredEmail", email);
    }
  }, [email]);

  return (
    <div className="bg-svg absolute flex h-full w-full items-center justify-center bg-white px-4 md:px-0">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-xl">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">Verification</h2>
          <p className="text-gray-600">
            Password link has been sent to your email address at <br />
            <span className="font-medium text-black">{email}</span>
          </p>
        </div>

        <div className="mb-6 flex flex-col items-center gap-4">
          <div className="rounded-full bg-green-100 p-3">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">Check your email</h3>
          <p className="text-sm text-gray-500">
            We've sent a password reset link to <br />
            <span className="font-medium text-black">{email}</span>
          </p>
        </div>
        <p className="mb-4 text-sm text-gray-500">
          Didn't receive the email? Check your spam folder or{" "}
          <button className="text-btBlue cursor-pointer font-semibold hover:underline" onClick={() => window.location.reload()}>
            try again
          </button>
        </p>
        <button
          onClick={() => {
            if (onBack) onBack();
            router.push("/login");
          }}
          className="mt-4 cursor-pointer text-sm text-gray-600 transition hover:text-violet-700">
          ← Back to login
        </button>
      </div>
    </div>
  );
}
