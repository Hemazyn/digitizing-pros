'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Notify, Loading } from 'notiflix';
import Logo from './Logo';
import Verified from './Verified';
import { fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import Link from 'next/link';

export default function ForgotPassword({ setEmail }) {
     const router = useRouter();
     const [form, setForm] = useState({ email: '' });
     const [showVerify, setShowVerify] = useState(false);

     const handleChange = (e) => {
          setForm({ ...form, [e.target.name]: e.target.value });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();

          if (!form.email) {
               Notify.failure('Please enter your email.');
               return;
          }

          try {
               Loading.standard('Sending reset email...');
               await sendPasswordResetEmail(auth, form.email);
               await new Promise((resolve) => setTimeout(resolve, 2000));
               Loading.remove();
               Notify.success('Password reset email sent successfully!');

               if (setEmail && typeof setEmail === 'function') {
                    setEmail(form.email);
               }

               setShowVerify(true);
          } catch (error) {
               Loading.remove();
               Notify.failure('Failed to send reset email. Please try again.');
               console.error(error);
          }
     };

     return (
          <div className="min-h-screen absolute w-full py-10 md:py-20 bg-svg bg-white flex flex-col items-center justify-center px-4">
               <Logo />
               {showVerify ? (
                    <Verified email={form.email} type="reset" onBack={() => setShowVerify(false)} />
               ) : (
                    <>
                         <div className="w-full max-w-md sm:max-w-lg bg-white shadow-xl rounded-lg p-4 md:p-8 mt-6">
                              <div className="text-start">
                                   <h2 className="text-2xl font-bold">Forgot Password</h2>
                                   <p className="text-btext font-medium text-base">Enter your email to reset your password</p>
                              </div>
                              <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                                   <div className="flex flex-col gap-3 w-full">
                                        <label className="block text-sm font-medium text-primary">Email</label>
                                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border border-sLine rounded-lg outline-0 placeholder:text-sm placeholder:font-medium" />
                                   </div>
                                   <button type="submit" className="w-full bg-btBlue hover:bg-btBlue/85 text-white py-2 rounded-lg font-semibold cursor-pointer">
                                        Create new password
                                   </button>
                              </form>
                         </div>
                         <a href="/login" className="text-sm text-gray-600 hover:text-violet-700 transition cursor-pointer mt-4">← Back to login</a>
                    </>
               )}
          </div>
     );
}
