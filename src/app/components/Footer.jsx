import Link from 'next/link';

export default function Footer() {
     return (
          <footer className="w-full border-t border-tLine py-4 px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 bg-white">
               <div className="mb-2 sm:mb-0 text-center sm:text-left">
                    &copy; {new Date().getFullYear()} Digitizing Pros. All rights reserved.
               </div>
               <nav className="flex space-x-6">
                    <Link href="/terms" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                         Terms
                    </Link>
                    <Link href="/privacy" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                         Privacy
                    </Link>
                    <Link href="/contact" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                         Contact
                    </Link>
               </nav>
          </footer>
     );
}
