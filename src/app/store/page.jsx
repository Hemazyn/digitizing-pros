'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

export default function StorePage() {
     const { user, loading } = useAuth();
     const router = useRouter();

     useEffect(() => {
          if (!loading && !user) {
               router.push('/login');
          }
     }, [user, loading]);

     const handleLogout = async () => {
          await signOut(auth);
          router.push('/');
     };

     if (!user) return null;

     const displayInitial = user.displayName ? user.displayName.charAt(0).toUpperCase() : '?';
     const firstName = user.displayName ? user.displayName.split(' ')[0] : '?';

     return (
          <div className="p-10">
               <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold flex items-center gap-4">
                         Welcome to the Store Page 🎉
                         {user.photoURL ? (
                              <img src={user.photoURL} alt="User Profile" className="w-10 h-10 rounded-full object-cover" />
                         ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                                   {displayInitial}
                              </div>
                         )}
                    </h1>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
                         Log Out
                    </button>
               </div>
               <p className="text-gray-700">You are logged in as: {firstName}</p>
          </div>
     );
}
