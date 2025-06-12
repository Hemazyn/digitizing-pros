"use client";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Notiflix from "notiflix";
import Logo from "../components/Logo";
import Image from "next/image";
import Link from "next/link";
import ForgotPassword from "../components/ForgotPassword";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    if (user && user.emailVerified) {
      router.push("/store");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    Notiflix.Loading.circle("Signing you in...");

    try {
      const res = await signInWithEmailAndPassword(auth, form.email, form.password);

      if (!res.user.emailVerified) {
        setError("Please verify your email before signing in.");
        Notiflix.Notify.warning("Please verify your email before signing in.");
        Notiflix.Loading.remove();
        setLoading(false);
        return;
      }

      Notiflix.Notify.success("Login successful!");
      router.push("/store");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
      Notiflix.Notify.failure("Invalid email or password.");
    } finally {
      Notiflix.Loading.remove();
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    Notiflix.Loading.circle("Signing you in with Google...");

    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.emailVerified) {
        await user.sendEmailVerification();
        Notiflix.Notify.info("Please verify your Google email address. Verification email sent.");
      } else {
        Notiflix.Notify.success("Google sign-in successful!");
        router.push("/store");
      }
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed. Please try again.");
      Notiflix.Notify.failure("Google sign-in failed. Please try again.");
    } finally {
      Notiflix.Loading.remove();
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-svg md:py-20">
      <Logo />
      <div className="w-full max-w-md p-4 mt-6 bg-white rounded-lg shadow-xl sm:max-w-lg md:p-8">
        <div className="text-start">
          <h2 className="text-2xl font-bold">Sign In</h2>
          <p className="text-base font-medium text-btext">Enter your email and password to access your account</p>
        </div>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div className="flex flex-col w-full gap-3">
            <label className="block text-sm font-medium text-primary">Email</label>
            <input type="email" name="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg border-sLine outline-0 placeholder:text-sm placeholder:font-medium" value={form.email} onChange={handleChange} required />
          </div>
          <div className="flex flex-col w-full gap-3">
            <label className="block text-sm font-medium text-primary">Password</label>
            <input type="password" name="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg border-sLine outline-0 placeholder:text-sm placeholder:font-medium" value={form.password} onChange={handleChange} required />
            <span className="font-medium text-btext text-xxs">Password must be at least 8 characters long</span>
          </div>
          <div className="flex flex-row items-center justify-between w-full">
            <label className="flex items-center space-x-2 text-sm font-medium">
              <input type="checkbox" name="agreeToTerms" className="w-4 h-4 accent-btBlue" checked={form.agreeToTerms} onChange={handleChange} />
              <span>Remember me</span>
            </label>
            <span className="text-xs font-medium cursor-pointer text-btBlue" onClick={() => setShowForgotPassword(true)}>
              Forgot password?
            </span>
          </div>
          <button type="submit" className={`bg-btBlue hover:bg-btBlue/85 w-full cursor-pointer rounded-lg py-2 font-semibold text-white ${loading ? "cursor-not-allowed opacity-50" : ""}`} disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <div className="flex flex-wrap items-center justify-center w-full gap-2 px-2 sm:px-4">
            <div className="bg-sLine h-0.5 min-w-[50px] flex-1"></div>
            <span className="text-xs font-medium text-primary whitespace-nowrap sm:text-sm">Or Continue With</span>
            <div className="bg-sLine h-0.5 min-w-[50px] flex-1"></div>
          </div>
          <button onClick={handleGoogleSignIn} type="button" className="flex items-center justify-center w-full gap-2 py-2 border rounded-lg cursor-pointer border-sLine">
            <Image src="/google.svg" alt="Google" width={26} height={26} />
            <span className="text-sm font-medium text-primary">Google</span>
          </button>
        </form>
      </div>
      <p className="mt-6 text-sm text-center">
        Don't have an account?{" "}
        <Link href="/register" className="text-btBlue">
          Create an account
        </Link>
      </p>
      {showForgotPassword && <ForgotPassword />}
    </div>
  );
}
