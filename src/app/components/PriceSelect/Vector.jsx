import Image from "next/image";

export default function Vector() {
     const data = [
          { quantity: "10+", type: "Simple Designs", price: "$5", savings: "Save $2 each" },
          { quantity: "10+", type: "Moderate Designs", price: "$13", savings: "Save $2 each" },
          { quantity: "10+", type: "Complex Designs", price: "$18", savings: "Save $2 each" },
          { quantity: "20+", type: "Simple Designs", price: "$4.5", savings: "Save $2 each" },
          { quantity: "20+", type: "Moderate Designs", price: "$12.5", savings: "Save $2 each" },
          { quantity: "20+", type: "Complex Designs", price: "$17.5", savings: "Save $2 each" },
     ];

     return (
          <div className="flex flex-col gap-10 px-4 md:px-8 lg:px-16 py-0 md:py-8 max-w-7xl mx-auto">
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {[
                         {
                              title: "Simple Design",
                              subtitle: "Per design only",
                              price: "$7",
                              features: ["Basic Shapes", "Few Colors", "Simple Text"],
                         },
                         {
                              title: "Moderate Design",
                              subtitle: "Per design only",
                              price: "$15",
                              features: ["Moderate complexity", "Multiple colors", "Detailed elements"],
                         },
                         {
                              title: "Complex Design",
                              subtitle: "Per design (10+ designs)",
                              price: "$20",
                              features: ["Highly detailed", "Many colors", "Complex illustrations"],
                         },
                    ].map(({ title, subtitle, price, features }, i) => (
                         <div key={i} className="rounded-xl shadow-sm bg-white flex flex-col">
                              <div className="bg-cardBg p-6 rounded-t-xl border-b border-sLine flex flex-col gap-3">
                                   <h3 className="font-semibold text-xl text-gray-900">{title}</h3>
                                   <p className="text-sm font-medium text-gray-500">{subtitle}</p>
                                   <span className="font-semibold text-3xl text-gray-900">{price}</span>
                              </div>
                              <ul className="p-6 space-y-3 flex-1 flex flex-col justify-center">
                                   {features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                                             <Image src="/checkmark.svg" alt="checkmark" width={16} height={16} />
                                             <span>{feature}</span>
                                        </li>
                                   ))}
                              </ul>
                         </div>
                    ))}
               </div>
               <section>
                    <h2 className="text-center font-bold text-2xl md:text-3xl mb-6 text-gray-900">
                         Bulk Order Discounts – Vector Services
                    </h2>

                    <div className="overflow-x-auto">
                         <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                              <thead className="bg-theadBg text-gray-600">
                                   <tr>
                                        <th className="px-4 py-3 font-medium text-xs text-primary uppercase tracking-wider">
                                             Quantity
                                        </th>
                                        <th className="px-4 py-3 font-medium text-xs text-primary uppercase tracking-wider">
                                             Type
                                        </th>
                                        <th className="px-4 py-3 font-medium text-xs text-primary uppercase tracking-wider">
                                             Price
                                        </th>
                                        <th className="px-4 py-3 font-medium text-xs text-success uppercase tracking-wider">
                                             Savings
                                        </th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {data.map((item, index) => (
                                        <tr key={index} className={`border-t border-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                             }`} >
                                             <td className="px-4 py-3 text-xs font-medium text-primary whitespace-nowrap">
                                                  {item.quantity}
                                             </td>
                                             <td className="px-4 py-3 text-xs font-medium text-primary whitespace-nowrap">
                                                  {item.type}
                                             </td>
                                             <td className="px-4 py-3 text-xs font-medium text-primary whitespace-nowrap">
                                                  {item.price}
                                             </td>
                                             <td className="px-4 py-3 text-xs font-medium text-success whitespace-nowrap">
                                                  {item.savings}
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               </section>
          </div>
     );
}