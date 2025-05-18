import Image from "next/image";

export default function FileTypes() {
     const fileTypes = ["DST", "EMB", "PES", "PXF", "JEF", "CND", "HUS", "NGS", "EXP"];

     return (
          <section className="bg-theadBg py-12 px-4 space-y-16">
               <div className="flex flex-col gap-5 max-w-4xl mx-auto">
                    <div className="flex flex-col gap-2">
                         <h2 className="text-3xl font-bold text-center">Turnaround Times</h2>
                         <p className="text-center text-base text-btext">
                              We pride ourselves on fast, reliable delivery
                         </p>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm p-6 w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
                         <div className="flex justify-between border-b border-tLine py-4">
                              <span className="font-semibold text-sm text-btext">Standard Delivery</span>
                              <span className="font-semibold text-sm text-primary">12–24 hours</span>
                         </div>
                         <div className="flex justify-between border-b border-tLine py-4 text-gray-400">
                              <span className="font-semibold text-sm text-btext">Rush Orders</span>
                              <span className="font-semibold text-sm text-unavail">Currently unavailable</span>
                         </div>
                         <div className="flex justify-between py-4">
                              <span className="font-semibold text-sm text-btext">Patch Orders</span>
                              <span className="font-semibold text-sm text-primary">
                                   10–15 days for production and free shipping
                              </span>
                         </div>
                    </div>
               </div>
               <div className="flex flex-col gap-5 max-w-4xl mx-auto">
                    <div className="flex flex-col gap-2">
                         <h2 className="text-3xl font-bold text-center">File Types Provided</h2>
                         <p className="text-center text-base text-btext">
                              We provide files in all major embroidery formats
                         </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
                         <div className="flex flex-wrap gap-3 justify-center border-b border-tLine pb-4 mb-4">
                              {fileTypes.map((type) => (
                                   <span key={type} className="bg-cardBg px-3 py-1 rounded-lg shadow text-sm font-semibold">
                                        {type}
                                   </span>
                              ))}
                         </div>
                         <p className="text-center text-xs text-gray-500 mb-6">
                              Please mention the format you need when placing your order.
                         </p>
                         <div className="space-y-3 text-sm text-gray-700">
                              <p className="text-sm font-normal text-btext">
                                   We specialize in embroidery digitizing using industry-leading
                                   software to ensure top-quality stitch files in a variety of formats:
                              </p>
                              <ul className="space-y-3">
                                   <li className="flex gap-1.5 items-center">
                                        <Image src="/checkmark.svg" alt="Checkmark" width={16} height={16} />
                                        <span className="text-sm font-medium text-primary">Wilcom — for EMB files</span>
                                   </li>
                                   <li className="flex gap-1.5 items-center">
                                        <Image src="/checkmark.svg" alt="Checkmark" width={16} height={16} />
                                        <span className="text-sm font-medium text-primary">Tajima Pulse — for PXF files</span>
                                   </li>
                                   <li className="flex gap-1.5 items-center">
                                        <Image src="/checkmark.svg" alt="Checkmark" width={16} height={16} />
                                        <span className="text-sm font-medium text-primary">Wings XP — for NGS files</span>
                                   </li>
                              </ul>
                         </div>
                    </div>
               </div>
          </section>
     );
}
