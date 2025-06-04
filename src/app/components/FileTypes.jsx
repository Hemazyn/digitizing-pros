import Image from "next/image";

export default function FileTypes() {
  const fileTypes = ["DST", "EMB", "PES", "PXF", "JEF", "CND", "HUS", "NGS", "EXP"];

  return (
    <section className="bg-theadBg space-y-16 px-4 py-12">
      <div className="mx-auto flex max-w-4xl flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-center text-3xl font-bold">Turnaround Times</h2>
          <p className="text-btext text-center text-base">We pride ourselves on fast, reliable delivery</p>
        </div>
        <div className="mx-auto w-full overflow-hidden rounded-lg bg-white p-6 shadow-sm sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
          <div className="border-tLine flex justify-between border-b py-4">
            <span className="text-btext text-sm font-semibold">Standard Delivery</span>
            <span className="text-primary text-sm font-semibold">12–24 hours</span>
          </div>
          <div className="border-tLine flex justify-between border-b py-4 text-gray-400">
            <span className="text-btext text-sm font-semibold">Rush Orders</span>
            <span className="text-unavail text-sm font-semibold">Currently unavailable</span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-btext text-sm font-semibold">Patch Orders</span>
            <span className="text-primary text-sm font-semibold">10–15 days for production and free shipping</span>
          </div>
          <p className="text-btext mt-1.5 text-center text-xs font-semibold">Complex logos will take 2-3 days for delivery</p>
        </div>
      </div>
      <div className="mx-auto flex max-w-4xl flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-center text-3xl font-bold">File Types Provided</h2>
          <p className="text-btext text-center text-base">We provide files in all major embroidery formats</p>
        </div>
        <div className="mx-auto w-full rounded-lg bg-white p-6 shadow-sm sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
          <div className="border-tLine mb-4 flex flex-wrap justify-center gap-3 border-b pb-4">
            {fileTypes.map((type) => (
              <span key={type} className="bg-cardBg rounded-lg px-3 py-1 text-sm font-semibold shadow">
                {type}
              </span>
            ))}
          </div>
          <p className="mb-6 text-center text-xs text-gray-500">Please mention the format you need when placing your order.</p>
          <div className="space-y-3 text-sm text-gray-700">
            <p className="text-btext text-sm font-normal">We specialize in embroidery digitizing using industry-leading software to ensure top-quality stitch files in a variety of formats:</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-1.5">
                <Image src="/checkmark.svg" alt="Checkmark" width={16} height={16} />
                <span className="text-primary text-sm font-medium">Wilcom — for EMB files</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Image src="/checkmark.svg" alt="Checkmark" width={16} height={16} />
                <span className="text-primary text-sm font-medium">Tajima Pulse — for PXF files</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Image src="/checkmark.svg" alt="Checkmark" width={16} height={16} />
                <span className="text-primary text-sm font-medium">Wings XP — for NGS files</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
