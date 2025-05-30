'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, browserSessionPersistence, setPersistence } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const setupAuthPersistence = async () => {
               try {
                    await setPersistence(auth, browserSessionPersistence);

                    const unsubscribe = onAuthStateChanged(auth, (user) => {
                         setUser(user);
                         setLoading(false);
                    });
                    return () => unsubscribe();
               } catch (error) {
                    console.error("Error setting Firebase persistence:", error);
                    setLoading(false);
               }
          };

          setupAuthPersistence();
     }, []);

     useEffect(() => {
          let activityTimer;

          const resetActivityTimer = () => {
               clearTimeout(activityTimer);
               if (user) {
                    activityTimer = setTimeout(async () => {
                         console.log("30 minutes of inactivity. Signing out user.");
                         await auth.signOut();
                         setUser(null);
                    }, 30 * 60 * 1000);
               }
          };

          const handleUserActivity = () => {
               resetActivityTimer();
          };

          window.addEventListener('mousemove', handleUserActivity);
          window.addEventListener('keydown', handleUserActivity);
          window.addEventListener('scroll', handleUserActivity);
          window.addEventListener('click', handleUserActivity);

          resetActivityTimer();

          return () => {
               clearTimeout(activityTimer);
               window.removeEventListener('mousemove', handleUserActivity);
               window.removeEventListener('keydown', handleUserActivity);
               window.removeEventListener('scroll', handleUserActivity);
               window.removeEventListener('click', handleUserActivity);
          };
     }, [user]);

     return (
          <AuthContext.Provider value={{ user, loading }}>
               {!loading && children}
          </AuthContext.Provider>
     );
}

export const useAuth = () => useContext(AuthContext);

// 'use client';
// import { createContext, useContext, useEffect, useState } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '@/firebase/firebase';

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//      const [user, setUser] = useState(null);
//      const [loading, setLoading] = useState(true);

//      useEffect(() => {
//           const unsubscribe = onAuthStateChanged(auth, (user) => {
//                setUser(user);
//                setLoading(false);
//           });
//           return () => unsubscribe();
//      }, []);

//      return (
//           <AuthContext.Provider value={{ user, loading }}>
//                {!loading && children}
//           </AuthContext.Provider>
//      );
// }

// export const useAuth = () => useContext(AuthContext);