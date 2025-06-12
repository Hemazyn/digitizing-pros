import Image from "next/image";

export default function Digitizing() {
     const under5Inches = [
          { quantity: "10+", type: "Simple Logos", price: "$5", savings: "Save $2 each" },
          { quantity: "20+", type: "Simple Logos", price: "$4.5", savings: "Save $2.5 each" },
          { quantity: "10+", type: "Complex Designs", price: "$10", savings: "Save $2 each" },
          { quantity: "20+", type: "Complex Designs", price: "$9.5", savings: "Save $2.5 each" },
     ];
     const over5Inches = [
          { quantity: "10+", type: "Simple Logos", price: "$13", savings: "Save $2 each" },
          { quantity: "20+", type: "Simple Logos", price: "$12.5", savings: "Save $2.5 each" },
          { quantity: "10+", type: "Moderate Logos", price: "$18", savings: "Save $2 each" },
          { quantity: "20+", type: "Moderate Logos", price: "$17.5", savings: "Save $2.5 each" },
          { quantity: "10+", type: "Complex Logos", price: "$28", savings: "Save $2 each" },
          { quantity: "20+", type: "Moderate Logos", price: "$27.5", savings: "Save $2.5 each" },
     ];

     return (
          <div className="flex flex-col px-4 space-y-12 md:px-6 lg:px-20">
               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="text-left bg-white shadow-sm rounded-xl">
                         <div className="p-5 border-b bg-cardBg md:p-6 rounded-t-xl border-sLine">
                              <h3 className="mb-1 text-lg font-semibold md:text-xl">Under 5 Inches</h3>
                              <p className="text-sm text-gray-500">Chest logos, Hat fronts, Shirt sleeves, Small patches</p>
                         </div>
                         <ul className="p-5 space-y-3 text-sm md:p-6">
                              <li className="flex items-center justify-between">
                                   <div className="flex gap-2">
                                        <Image src="/checkmark.svg" alt="checkmark" width={16} height={16} />
                                        <span>Simple Logo</span>
                                   </div>
                                   <span className="font-semibold">$7</span>
                              </li>
                              <li className="flex items-center justify-between">
                                   <div className="flex gap-2">
                                        <Image src="/checkmark.svg" alt="checkmark" width={16} height={16} />
                                        <span>Complex Logo</span>
                                   </div>
                                   <span className="font-semibold">$12</span>
                              </li>
                         </ul>
                    </div>
                    <div className="text-left bg-white shadow-sm rounded-xl">
                         <div className="p-5 border-b bg-cardBg md:p-6 rounded-t-xl border-sLine">
                              <h3 className="mb-1 text-lg font-semibold md:text-xl">Over 5 Inches</h3>
                              <p className="text-sm text-gray-500">
                                   Back of jackets, large tote bags, Big patches, Promotional banners
                              </p>
                         </div>
                         <ul className="p-5 space-y-3 text-sm md:p-6">
                              <li className="flex items-center justify-between">
                                   <div className="flex gap-2">
                                        <Image src="/checkmark.svg" alt="checkmark" width={16} height={16} />
                                        <span>Simple Logo</span>
                                   </div>
                                   <span className="font-semibold">$15</span>
                              </li>
                              <li className="flex items-center justify-between">
                                   <div className="flex gap-2">
                                        <Image src="/checkmark.svg" alt="checkmark" width={16} height={16} />
                                        <span>Moderate Logo</span>
                                   </div>
                                   <span className="font-semibold">$20</span>
                              </li>
                              <li className="flex items-center justify-between">
                                   <div className="flex gap-2">
                                        <Image src="/checkmark.svg" alt="checkmark" width={16} height={16} />
                                        <span>Complex Logo</span>
                                   </div>
                                   <span className="font-semibold">$30</span>
                              </li>
                         </ul>
                    </div>
               </div>
               <section>
                    <h2 className="mb-6 text-xl font-bold text-center md:text-2xl">Bulk Order Discounts – Under 5 Inches</h2>
                    <div className="overflow-x-auto">
                         <div className="min-w-full border rounded-lg shadow-sm border-btGray">
                              <table className="min-w-[600px] md:min-w-full text-left text-sm bg-white">
                                   <thead className="text-btext bg-theadBg">
                                        <tr>
                                             <th className="px-4 py-3 text-xs font-medium text-primary">Quantity</th>
                                             <th className="px-4 py-3 text-xs font-medium text-primary">Type</th>
                                             <th className="px-4 py-3 text-xs font-medium text-primary">Price</th>
                                             <th className="px-4 py-3 text-xs font-medium text-primary">Savings</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {under5Inches.map((item, index) => (
                                             <tr key={index} className="border-t border-gray-100">
                                                  <td className="px-4 py-3 text-xs font-medium text-primary">{item.quantity}</td>
                                                  <td className="px-4 py-3 text-xs font-medium text-primary">{item.type}</td>
                                                  <td className="px-4 py-3 text-xs font-medium text-primary">{item.price}</td>
                                                  <td className="px-4 py-3 text-xs font-medium text-success">{item.savings}</td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </div>
                    </div>
               </section>
               <section>
                    <h2 className="mb-6 text-xl font-bold text-center md:text-2xl">Bulk Order Discounts – Over 5 Inches</h2>
                    <div className="overflow-x-auto">
                         <div className="min-w-full border rounded-lg shadow-sm border-btGray">
                              <table className="min-w-[600px] md:min-w-full text-left text-sm bg-white">
                                   <thead className="text-btext bg-theadBg">
                                        <tr>
                                             <th className="px-4 py-3 text-xs font-medium text-primary">Quantity</th>
                                             <th className="px-4 py-3 text-xs font-medium text-primary">Type</th>
                                             <th className="px-4 py-3 text-xs font-medium text-primary">Price</th>
                                             <th className="px-4 py-3 text-xs font-medium text-primary">Savings</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {over5Inches.map((item, index) => (
                                             <tr key={index} className="border-t border-gray-100">
                                                  <td className="px-4 py-3 text-xs font-medium text-primary">{item.quantity}</td>
                                                  <td className="px-4 py-3 text-xs font-medium text-primary">{item.type}</td>
                                                  <td className="px-4 py-3 text-xs font-medium text-primary">{item.price}</td>
                                                  <td className="px-4 py-3 text-xs font-medium text-success">{item.savings}</td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </div>
                    </div>
               </section>
          </div>
     );
}