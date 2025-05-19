'use client';
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Notiflix from 'notiflix';
import Logo from '../components/Logo';
import Link from 'next/link';
import Image from 'next/image';
import VerifyEmailPage from '../components/VerifyEmail';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function RegisterPage() {
     const { user } = useAuth();
     const router = useRouter();
     // const [error, setError] = useState('');
     const [showVerifyPopup, setShowVerifyPopup] = useState(false);
     const [registeredEmail, setRegisteredEmail] = useState('');

     const [form, setForm] = useState({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          company: '',
          agreeToTerms: false,
     });

     const handleChange = (e) => {
          const { name, value, type, checked } = e.target;
          setForm((prev) => ({
               ...prev,
               [name]: type === 'checkbox' ? checked : value,
          }));
     };

     const handleRegister = async (e) => {
          e.preventDefault();

          if (!form.agreeToTerms) {
               Notiflix.Notify.failure('You must agree to the terms and conditions.');
               return;
          }

          Notiflix.Loading.circle('Creating account...');

          try {
               const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
               await sendEmailVerification(userCredential.user);

               Notiflix.Loading.remove();
               Notiflix.Notify.success('Account created! Please verify your email.');
               localStorage.setItem('registeredEmail', form.email);
               setRegisteredEmail(form.email);
               setShowVerifyPopup(true);
          } catch (err) {
               Notiflix.Loading.remove();
               Notiflix.Notify.failure(err.message);
          }
     };

     const handleGoogleSignIn = async () => {
          Notiflix.Loading.circle('Signing in with Google...');
          const provider = new GoogleAuthProvider();

          try {
               const result = await signInWithPopup(auth, provider);
               Notiflix.Loading.remove();
               const user = result.user;

               if (user.emailVerified) {
                    Notiflix.Notify.success(`Welcome back, ${user.email}`);
                    router.push('/store');
               } else {
                    Notiflix.Notify.info('Please verify your email to continue.');
               }
          } catch (error) {
               Notiflix.Loading.remove();
               Notiflix.Notify.failure('Google sign-in failed. Please try again.');
               console.error('Google sign-in error:', error);
          }
     };



     return (
          <div className="min-h-screen relative py-10 md:py-20 bg-svg flex flex-col items-center justify-center px-4 md:px-0">
               <Logo />
               <div className="w-full max-w-md sm:max-w-lg bg-white shadow-xl rounded-lg p-4 md:p-8 mt-6">
                    <div className="text-start">
                         <h2 className="text-2xl font-bold">Create an Account</h2>
                         <p className="text-btext font-medium text-base">Enter your information to create your account</p>
                    </div>
                    <form onSubmit={handleRegister} className="space-y-4 mt-6">
                         <div className="flex flex-row space-x-4">
                              <div className="flex flex-col gap-3 w-full">
                                   <label className="block text-sm font-medium text-primary">First Name</label>
                                   <input type="text" name="firstName" placeholder="First Name" className="w-full px-4 py-2 border border-sLine rounded-lg outline-0 placeholder:text-sm placeholder:font-medium" value={form.firstName} onChange={handleChange} required />
                              </div>
                              <div className="flex flex-col gap-3 w-full">
                                   <label className="block text-sm font-medium text-primary">Last Name</label>
                                   <input type="text" name="lastName" placeholder="Last Name" className="w-full px-4 py-2 border border-sLine rounded-lg outline-0 placeholder:text-sm placeholder:font-medium" value={form.lastName} onChange={handleChange} required />
                              </div>
                         </div>
                         <div className="flex flex-col gap-3 w-full">
                              <label className="block text-sm font-medium text-primary">Email</label>
                              <input type="email" name="email" placeholder="Email" className="w-full px-4 py-2 border border-sLine rounded-lg outline-0 placeholder:text-sm placeholder:font-medium" value={form.email} onChange={handleChange} required />
                         </div>
                         <div className="flex flex-col gap-3 w-full">
                              <label className="block text-sm font-medium text-primary">Password</label>
                              <input type="password" name="password" placeholder="Password" className="w-full px-4 py-2 border border-sLine rounded-lg outline-0 placeholder:text-sm placeholder:font-medium" value={form.password} onChange={handleChange} required />
                              <span className="text-[10px] text-btext font-medium">Password must be at least 8 characters long</span>
                         </div>
                         <div className="flex flex-col gap-3 w-full">
                              <label className="block text-sm font-medium text-primary">Company Name (Optional)</label>
                              <input type="text" name="company" placeholder="Your company" className="w-full px-4 py-2 border border-sLine rounded-lg outline-0 placeholder:text-sm placeholder:font-medium" value={form.company} onChange={handleChange} />
                         </div>

                         <label className="flex items-center text-sm font-medium space-x-2">
                              <input type="checkbox" name="agreeToTerms" className="h-4 w-4 accent-btBlue" checked={form.agreeToTerms} onChange={handleChange} />
                              <span>I agree to the <Link href="/terms" className="text-btBlue">Terms of Service</Link> and <Link href="/privacy" className="text-btBlue">Privacy Policy </Link>
                              </span>
                         </label>
                         <button type="submit" className="w-full bg-btBlue hover:bg-btBlue/85 text-white py-2 rounded-lg font-semibold cursor-pointer" >
                              Create Account
                         </button>
                         <div className="flex flex-wrap items-center justify-center gap-2 w-full px-2 sm:px-4">
                              <div className="flex-1 h-0.5 bg-sLine min-w-[50px]"></div>
                              <span className="text-primary font-medium text-xs sm:text-sm whitespace-nowrap">
                                   Or Continue With
                              </span>
                              <div className="flex-1 h-0.5 bg-sLine min-w-[50px]"></div>
                         </div>
                         <button onClick={handleGoogleSignIn} type="button" className="w-full flex items-center justify-center border border-sLine rounded-lg py-2 gap-2 cursor-pointer">
                              <Image src="/google.svg" alt="Google" width={26} height={26} />
                              <span className="text-sm font-medium text-primary">Google</span>
                         </button>
                    </form>
               </div>
               <p className="text-sm text-center mt-6">
                    Already have an account? <Link href="/login" className="text-btBlue">Sign in</Link>
               </p>
               {showVerifyPopup && <VerifyEmailPage email={registeredEmail} />
               }
          </div>
     );
}
