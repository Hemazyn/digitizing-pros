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
          <div className="flex flex-col space-y-12 px-4 md:px-6 lg:px-20">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl bg-white text-left shadow-sm">
                         <div className="bg-cardBg p-5 md:p-6 rounded-t-xl border-b border-sLine">
                              <h3 className="font-semibold text-lg md:text-xl mb-1">Under 5 Inches</h3>
                              <p className="text-sm text-gray-500">Chest logos, Hat fronts, Shirt sleeves, Small patches</p>
                         </div>
                         <ul className="space-y-3 text-sm p-5 md:p-6">
                              <li className="flex justify-between items-center">
                                   <div className="flex gap-2">
                                        <Image src="/checkmark.svg" alt="checkmark" width={16} height={16} />
                                        <span>Simple Logo</span>
                                   </div>
                                   <span className="font-semibold">$7</span>
                              </li>
                              <li className="flex justify-between items-center">
                                   <div className="flex gap-2">
                                        <Image src="/checkmark.svg" alt="checkmark" width={16} height={16} />
                                        <span>Complex Logo</span>
                                   </div>
                                   <span className="font-semibold">$12</span>
                              </li>
                         </ul>
                    </div>
                    <div className="rounded-xl bg-white text-left shadow-sm">
                         <div className="bg-cardBg p-5 md:p-6 rounded-t-xl border-b border-sLine">
                              <h3 className="font-semibold text-lg md:text-xl mb-1">Over 5 Inches</h3>
                              <p className="text-sm text-gray-500">
                                   Back of jackets, large tote bags, Big patches, Promotional banners
                              </p>
                         </div>
                         <ul className="space-y-3 text-sm p-5 md:p-6">
                              <li className="flex justify-between items-center">
                                   <div className="flex gap-2">
                                        <Image src="/checkmark.svg" alt="checkmark" width={16} height={16} />
                                        <span>Simple Logo</span>
                                   </div>
                                   <span className="font-semibold">$15</span>
                              </li>
                              <li className="flex justify-between items-center">
                                   <div className="flex gap-2">
                                        <Image src="/checkmark.svg" alt="checkmark" width={16} height={16} />
                                        <span>Moderate Logo</span>
                                   </div>
                                   <span className="font-semibold">$20</span>
                              </li>
                              <li className="flex justify-between items-center">
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
                    <h2 className="font-bold text-xl md:text-2xl text-center mb-6">Bulk Order Discounts – Under 5 Inches</h2>
                    <div className="overflow-x-auto">
                         <div className="rounded-lg shadow-sm border border-gray-200 min-w-full">
                              <table className="min-w-[600px] md:min-w-full text-left text-sm bg-white">
                                   <thead className="bg-theadBg text-gray-600">
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
                                                  <td className="px-4 py-3 text-xs text-primary font-medium">{item.quantity}</td>
                                                  <td className="px-4 py-3 text-xs text-primary font-medium">{item.type}</td>
                                                  <td className="px-4 py-3 text-xs text-primary font-medium">{item.price}</td>
                                                  <td className="px-4 py-3 text-xs text-success font-medium">{item.savings}</td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </div>
                    </div>
               </section>
               <section>
                    <h2 className="font-bold text-xl md:text-2xl text-center mb-6">Bulk Order Discounts – Over 5 Inches</h2>
                    <div className="overflow-x-auto">
                         <div className="rounded-lg shadow-sm border border-gray-200 min-w-full">
                              <table className="min-w-[600px] md:min-w-full text-left text-sm bg-white">
                                   <thead className="bg-theadBg text-gray-600">
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
                                                  <td className="px-4 py-3 text-xs text-primary font-medium">{item.quantity}</td>
                                                  <td className="px-4 py-3 text-xs text-primary font-medium">{item.type}</td>
                                                  <td className="px-4 py-3 text-xs text-primary font-medium">{item.price}</td>
                                                  <td className="px-4 py-3 text-xs text-success font-medium">{item.savings}</td>
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