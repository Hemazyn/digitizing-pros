import Image from "next/image";

export default function Patches() {
     return (
          <div className="flex flex-col gap-6 px-4 md:px-8 lg:px-16 py-0 md:py-8 max-w-7xl mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl shadow-sm border border-gray-100">
                         <div className="flex flex-col gap-4 bg-cardBg p-6 rounded-t-xl border-b border-sLine">
                              <div>
                                   <h3 className="font-semibold text-xl">Woven Patches</h3>
                                   <p className="text-sm font-medium text-gray-500">Per patch</p>
                              </div>
                              <span className="font-semibold text-3xl">$1.50 - $2.00</span>
                         </div>
                         <ul className="space-y-3 text-sm p-6">
                              {[["100 patches", "$2.00 each"], ["250 patches", "$1.75 each"], ["500+ patches", "$1.50 each"]].map(([label, price]) => (
                                   <li key={label} className="flex justify-between items-center">
                                        <span className="font-medium text-btext">{label}</span>
                                        <span className="font-medium text-primary">{price}</span>
                                   </li>
                              ))}
                         </ul>
                    </div>
                    <div className="rounded-xl shadow-sm border border-gray-100">
                         <div className="flex flex-col gap-4 bg-cardBg p-6 rounded-t-xl border-b border-sLine">
                              <div>
                                   <h3 className="font-semibold text-xl">PVC (Rubber) Patches</h3>
                                   <p className="text-sm font-medium text-gray-500">Per patch</p>
                              </div>
                              <span className="font-semibold text-3xl">$1.10 - $1.50</span>
                         </div>
                         <ul className="space-y-3 text-sm p-6">
                              {[["100 patches", "$1.50 each"], ["250 patches", "$1.30 each"], ["500+ patches", "$1.10 each"],].map(([label, price]) => (
                                   <li key={label} className="flex justify-between items-center">
                                        <span className="font-medium text-btext">{label}</span>
                                        <span className="font-medium text-primary">{price}</span>
                                   </li>
                              ))}
                         </ul>
                    </div>
               </div>
               <div className="flex flex-col gap-4 rounded-xl shadow-sm border border-gray-100 p-6 bg-white">
                    <h3 className="font-semibold text-lg text-black">Important Notes</h3>
                    <ul className="space-y-3 text-sm">
                         {["Minimum order quantity (MOQ) is 100 patches", "Delivery time for patches is 10-15 days", "Custom designs and sizes available upon request", "Contact us for custom quotes on very intricate or unique projects"].map((note, index) => (
                              <li key={index} className="flex gap-2 items-center text-justify">
                                   <Image src="/checkmark.svg" alt="Checkmark" width={16} height={16} />
                                   <span className="text-sm font-medium text-primary">{note}</span>
                              </li>
                         ))}
                    </ul>
               </div>
          </div>
     );
}