import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex flex-row items-center justify-between">
      <Link href="/dashboard" className="flex w-fit cursor-pointer flex-row items-center gap-1.5 rounded-lg bg-white p-1.5 drop-shadow-md">
        <div className="bg-btBlue flex h-5 w-5 items-center justify-center rounded-sm">
          <Image src="/vector2.svg" alt="logo" width={12} height={12} className="borderbgbtBlue" />
        </div>
        <span className="text-primary font-bricolage text-xs font-semibold">Digitizing Pros</span>
      </Link>
      <Image src="/sidebar.svg" width={16} height={16} alt="sidebar" className="cursor-pointer" />
    </div>
  );
}
