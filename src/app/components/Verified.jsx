'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Verified({ email, onBack }) {
     const router = useRouter();
     useEffect(() => {
          if (email) {
               localStorage.setItem('registeredEmail', email);
          }
     }, [email]);

     return (
          <div className="h-full absolute w-full flex items-center justify-center bg-svg bg-white px-4 md:px-0">
               <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 text-center">
                    <div className="mb-6">
                         <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification</h2>
                         <p className="text-gray-600">
                              Password link has been sent to your email address at <br />
                              <span className="font-medium text-black">{email}</span>
                         </p>
                    </div>

                    <div className="flex flex-col items-center gap-4 mb-6">
                         <div className="bg-green-100 rounded-full p-3">
                              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                   <path d="M5 13l4 4L19 7" />
                              </svg>
                         </div>
                         <h3 className="text-lg font-semibold">Check your email</h3>
                         <p className="text-sm text-gray-500">
                              We've sent a password reset link to <br />
                              <span className="font-medium text-black">{email}</span>
                         </p>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                         Didn't receive the email? Check your spam folder or{' '}
                         <button className="text-btBlue font-semibold hover:underline cursor-pointer" onClick={() => window.location.reload()}>
                              try again
                         </button>
                    </p>
                    <button
                         onClick={() => {
                              if (onBack) onBack();
                              router.push('/login');
                         }}
                         className="text-sm text-gray-600 hover:text-violet-700 transition cursor-pointer mt-4" >
                         ← Back to login
                    </button>

               </div>
          </div>
     );
}