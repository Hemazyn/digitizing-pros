"use client";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Notiflix from "notiflix";
import Logo from "../components/Logo";
import Link from "next/link";
import Image from "next/image";
import VerifyEmailPage from "../components/VerifyEmail";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function RegisterPage() {
  const { user } = useAuth();
  const router = useRouter();
  // const [error, setError] = useState('');
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.agreeToTerms) {
      Notiflix.Notify.failure("You must agree to the terms and conditions.");
      return;
    }

    Notiflix.Loading.circle("Creating account...");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await sendEmailVerification(userCredential.user);

      Notiflix.Loading.remove();
      Notiflix.Notify.success("Account created! Please verify your email.");
      localStorage.setItem("registeredEmail", form.email);
      setRegisteredEmail(form.email);
      setShowVerifyPopup(true);
    } catch (err) {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    Notiflix.Loading.circle("Signing in with Google...");
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      Notiflix.Loading.remove();
      const user = result.user;

      if (user.emailVerified) {
        Notiflix.Notify.success(`Welcome back, ${user.email}`);
        router.push("/store");
      } else {
        Notiflix.Notify.info("Please verify your email to continue.");
      }
    } catch (error) {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure("Google sign-in failed. Please try again.");
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="bg-svg relative flex min-h-screen flex-col items-center justify-center px-4 py-10 md:px-0 md:py-20">
      <Logo />
      <div className="mt-6 w-full max-w-md rounded-lg bg-white p-4 shadow-xl sm:max-w-lg md:p-8">
        <div className="text-start">
          <h2 className="text-2xl font-bold">Create an Account</h2>
          <p className="text-btext text-base font-medium">Enter your information to create your account</p>
        </div>
        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div className="flex flex-row space-x-4">
            <div className="flex w-full flex-col gap-3">
              <label className="text-primary block text-sm font-medium">First Name</label>
              <input type="text" name="firstName" placeholder="First Name" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-sm placeholder:font-medium" value={form.firstName} onChange={handleChange} required />
            </div>
            <div className="flex w-full flex-col gap-3">
              <label className="text-primary block text-sm font-medium">Last Name</label>
              <input type="text" name="lastName" placeholder="Last Name" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-sm placeholder:font-medium" value={form.lastName} onChange={handleChange} required />
            </div>
          </div>
          <div className="flex w-full flex-col gap-3">
            <label className="text-primary block text-sm font-medium">Email</label>
            <input type="email" name="email" placeholder="Email" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-sm placeholder:font-medium" value={form.email} onChange={handleChange} required />
          </div>
          <div className="flex w-full flex-col gap-3">
            <label className="text-primary block text-sm font-medium">Password</label>
            <input type="password" name="password" placeholder="Password" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-sm placeholder:font-medium" value={form.password} onChange={handleChange} required />
            <span className="text-xxs text-btext font-medium">Password must be at least 8 characters long</span>
          </div>
          <div className="flex w-full flex-col gap-3">
            <label className="text-primary block text-sm font-medium">Company Name (Optional)</label>
            <input type="text" name="company" placeholder="Your company" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-sm placeholder:font-medium" value={form.company} onChange={handleChange} />
          </div>

          <label className="flex items-center space-x-2 text-sm font-medium">
            <input type="checkbox" name="agreeToTerms" className="accent-btBlue h-4 w-4" checked={form.agreeToTerms} onChange={handleChange} />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="text-btBlue">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-btBlue">
                Privacy Policy{" "}
              </Link>
            </span>
          </label>
          <button type="submit" className="bg-btBlue hover:bg-btBlue/85 w-full cursor-pointer rounded-lg py-2 font-semibold text-white">
            Create Account
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
        Already have an account?{" "}
        <Link href="/login" className="text-btBlue">
          Sign in
        </Link>
      </p>
      {showVerifyPopup && <VerifyEmailPage email={registeredEmail} />}
    </div>
  );
}
