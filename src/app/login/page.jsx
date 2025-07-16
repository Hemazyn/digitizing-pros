"use client";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Notiflix from "notiflix";
import Logo from "../components/Logo";
import Image from "next/image";
import Link from "next/link";
import ForgotPassword from "../components/ForgotPassword";
import { initializeUserSettings } from "@/lib/user/userSettings";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await initializeUserSettings(user.uid, {
          firstName: user.displayName?.split(" ")[0] || "",
          lastName: user.displayName?.split(" ")[1] || "",
          email: user.email || "",
        });
      }
    });
    return () => unsub();
  }, []);

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
    <div className="bg-svg relative flex min-h-screen flex-col items-center justify-center px-4 py-10 md:py-20">
      <Logo />
      <div className="mt-6 w-full max-w-md rounded-lg bg-white p-4 shadow-xl sm:max-w-lg md:p-8">
        <div className="text-start">
          <h2 className="text-2xl font-bold">Sign In</h2>
          <p className="text-btext text-base font-medium">Enter your email and password to access your account</p>
        </div>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div className="flex w-full flex-col gap-3">
            <label className="text-primary block text-sm font-medium">Email</label>
            <input type="email" name="email" placeholder="Email" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-sm placeholder:font-medium" value={form.email} onChange={handleChange} required />
          </div>
          <div className="flex w-full flex-col gap-3">
            <label className="text-primary block text-sm font-medium">Password</label>
            <input type="password" name="password" placeholder="Password" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-sm placeholder:font-medium" value={form.password} onChange={handleChange} required />
            <span className="text-btext text-xxs font-medium">Password must be at least 8 characters long</span>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <label className="flex items-center space-x-2 text-sm font-medium">
              <input type="checkbox" name="agreeToTerms" className="accent-btBlue h-4 w-4" checked={form.agreeToTerms} onChange={handleChange} />
              <span>Remember me</span>
            </label>
            <span className="text-btBlue cursor-pointer text-xs font-medium" onClick={() => setShowForgotPassword(true)}>
              Forgot password?
            </span>
          </div>
          <button type="submit" className={`bg-btBlue hover:bg-btBlue/85 w-full cursor-pointer rounded-lg py-2 font-semibold text-white ${loading ? "cursor-not-allowed opacity-50" : ""}`} disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <div className="flex w-full flex-wrap items-center justify-center gap-2 px-2 sm:px-4">
            <div className="bg-sLine h-0.5 min-w-[50px] flex-1"></div>
            <span className="text-primary text-xs font-medium whitespace-nowrap sm:text-sm">Or Continue With</span>
            <div className="bg-sLine h-0.5 min-w-[50px] flex-1"></div>
          </div>
          <button onClick={handleGoogleSignIn} type="button" className="border-sLine flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border py-2">
            <Image src="/google.svg" alt="Google" width={26} height={26} />
            <span className="text-primary text-sm font-medium">Google</span>
          </button>
        </form>
      </div>
      <p className="mt-6 text-center text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="text-btBlue">
          Create an account
        </Link>
      </p>
      {showForgotPassword && <ForgotPassword />}
    </div>
  );
}
