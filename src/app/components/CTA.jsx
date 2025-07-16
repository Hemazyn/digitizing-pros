import Link from "next/link";

export default function CTA() {
  return (
    <section className="mx-auto my-6 flex w-5/6 max-w-3xl flex-col items-center rounded-xl bg-gradient-to-b from-[#242424] to-[#8A8A8A] py-6 text-center md:py-12">
      <h3 className="text-2xl font-bold text-white md:text-3xl">Ready to Get Started?</h3>
      <p className="mt-1 text-sm text-white md:text-base">Upload your design now and receive your digitized files within 24 hours</p>
      <Link href="/dashboard?tab=orders&newOrder=true">
        <button className="btn-bg mt-8 cursor-pointer rounded-lg px-6 py-3 font-semibold text-white shadow-md">Upload Your Design</button>
      </Link>
    </section>
  );
}
