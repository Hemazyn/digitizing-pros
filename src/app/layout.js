import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { UserPreferencesProvider } from "@/context/UserPreferencesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Digitizing Pros",
  description: "Professional Digitizing Services for Embroidery Designs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}>
        <AuthProvider>
          <UserPreferencesProvider>
            <CartProvider>{children}</CartProvider>
          </UserPreferencesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
