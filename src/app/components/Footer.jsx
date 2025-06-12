import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white px-6 py-4 text-sm text-gray-500 sm:flex sm:items-center sm:justify-between">
      <div className="mb-2 text-center sm:mb-0 sm:text-left">&copy; {new Date().getFullYear()} Digitizing Pros. All rights reserved.</div>
      <nav className="flex justify-center space-x-6 sm:justify-start">
        <Link href="/terms" className="text-btext hover:text-btBlue hover:font-semibold underline-offset-0">
          Terms
        </Link>
        <Link href="/privacy" className="text-btext hover:text-btBlue hover:font-semibold underline-offset-0">
          Privacy
        </Link>
        <Link href="/contact" className="text-btext hover:text-btBlue hover:font-semibold underline-offset-0">
          Contact
        </Link>
      </nav>
    </footer>
  );
}
