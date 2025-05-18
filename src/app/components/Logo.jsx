import Image from "next/image";
import Link from "next/link";

const Logo = () => {
     return (
          <Link href="/" className="flex gap-1 items-center cursor-pointer">
               <Image src="/Vector.svg" alt="Next.js logo" width={22} height={22} priority />
               <h1 className="text-xl font-bold font-bricolage">Digitizing Pros</h1>
          </Link>
     );
}

export default Logo;
