'use client';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Notiflix from 'notiflix';
import Logo from '../components/Logo';
import Image from 'next/image';
import Link from 'next/link';
import ForgotPassword from '../components/ForgotPassword';

export default function LoginPage() {
     const router = useRouter();
     const { user } = useAuth();

     const [form, setForm] = useState({
          email: '',
          password: '',
          agreeToTerms: false,
     });

     const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);
     const [showForgotPassword, setShowForgotPassword] = useState(false);

     useEffect(() => {
          if (user && user.emailVerified) {
               router.push('/store');
          }
     }, [user]);

     const handleChange = (e) => {
          const { name, value, type, checked } = e.target;
          setForm((prev) => ({
               ...prev,
               [name]: type === 'checkbox' ? checked : value,
          }));
     };

     const handleLogin = async (e) => {
          e.preventDefault();
          setError('');
          setLoading(true);
          Notiflix.Loading.circle('Signing you in...');

          try {
               const res = await signInWithEmailAndPassword(auth, form.email, form.password);

               if (!res.user.emailVerified) {
                    setError('Please verify your email before signing in.');
                    Notiflix.Notify.warning('Please verify your email before signing in.');
                    Notiflix.Loading.remove();
                    setLoading(false);
                    return;
               }

               Notiflix.Notify.success('Login successful!');
               router.push('/store');
          } catch (err) {
               console.error(err);
               setError('Invalid email or password.');
               Notiflix.Notify.failure('Invalid email or password.');
          } finally {
               Notiflix.Loading.remove();
               setLoading(false);
          }
     };
     const handleGoogleSignIn = async () => {
          setError('');
          setLoading(true);
          Notiflix.Loading.circle('Signing you in with Google...');

          const provider = new GoogleAuthProvider();

          try {
               const result = await signInWithPopup(auth, provider);
               const user = result.user;

               if (!user.emailVerified) {
                    await user.sendEmailVerification();
                    Notiflix.Notify.info('Please verify your Google email address. Verification email sent.');
               } else {
                    Notiflix.Notify.success('Google sign-in successful!');
                    router.push('/store');
               }
          } catch (err) {
               console.error(err);
               setError('Google sign-in failed. Please try again.');
               Notiflix.Notify.failure('Google sign-in failed. Please try again.');
          } finally {
               Notiflix.Loading.remove();
               setLoading(false);
          }
     };

     return (
          <div className="min-h-screen relative py-10 md:py-20 bg-svg flex flex-col items-center justify-center px-4">
               <Logo />
               <div className="w-full max-w-md sm:max-w-lg bg-white shadow-xl rounded-lg p-4 md:p-8 mt-6">
                    <div className="text-start">
                         <h2 className="text-2xl font-bold">Sign In</h2>
                         <p className="text-btext font-medium text-base">Enter your email and password to access your account</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4 mt-6">
                         <div className="flex flex-col gap-3 w-full">
                              <label className="block text-sm font-medium text-primary">Email</label>
                              <input type="email" name="email" placeholder="Email" className="w-full px-4 py-2 border border-sLine rounded-lg outline-0 placeholder:text-sm placeholder:font-medium" value={form.email} onChange={handleChange} required />
                         </div>
                         <div className="flex flex-col gap-3 w-full">
                              <label className="block text-sm font-medium text-primary">Password</label>
                              <input type="password" name="password" placeholder="Password" className="w-full px-4 py-2 border border-sLine rounded-lg outline-0 placeholder:text-sm placeholder:font-medium" value={form.password} onChange={handleChange} required />
                              <span className="text-[10px] text-btext font-medium">Password must be at least 8 characters long</span>
                         </div>
                         <div className="flex flex-row items-center justify-between w-full">
                              <label className="flex items-center text-sm font-medium space-x-2">
                                   <input type="checkbox" name="agreeToTerms" className="h-4 w-4 accent-btBlue" checked={form.agreeToTerms} onChange={handleChange} />
                                   <span>Remember me</span>
                              </label>
                              <span className='text-btBlue font-medium text-xs cursor-pointer' onClick={() => setShowForgotPassword(true)}>
                                   Forgot password?
                              </span>
                         </div>
                         <button type="submit" className={`w-full bg-btBlue hover:bg-btBlue/85 text-white py-2 rounded-lg font-semibold cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                              disabled={loading}>
                              {loading ? 'Signing In...' : 'Sign In'}
                         </button>
                         <div className="flex flex-wrap items-center justify-center gap-2 w-full px-2 sm:px-4">
                              <div className="flex-1 h-0.5 bg-sLine min-w-[50px]"></div>
                              <span className="text-primary font-medium text-xs sm:text-sm whitespace-nowrap">Or Continue With</span>
                              <div className="flex-1 h-0.5 bg-sLine min-w-[50px]"></div>
                         </div>
                         <button onClick={handleGoogleSignIn} type="button" className="w-full flex items-center justify-center border border-sLine rounded-lg py-2 gap-2 cursor-pointer">
                              <Image src="/google.svg" alt="Google" width={26} height={26} />
                              <span className="text-sm font-medium text-primary">Google</span>
                         </button>
                    </form>
               </div>
               <p className="text-sm text-center mt-6">
                    Don't have an account? <Link href="/register" className="text-btBlue">Create an account</Link>
               </p>
               {showForgotPassword && (<ForgotPassword />)}
          </div>
     );
}
