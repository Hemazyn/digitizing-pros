import Image from "next/image";

export default function Billing() {
     const billingHistory = [
          { invoice: "INV-6672", amount: "$8.00", date: "April 16, 2025", actions: "View, Download" },
          { invoice: "INV-1209", amount: "$15.00", date: "April 12, 2025", actions: "View, Download" }
     ];

     return (
          <section className="bg-cardBg3 border-btGray max-h-full w-full rounded-[10px] border">
               <div className="mx-auto flex w-[92%] flex-col space-y-5 py-5">
                    <h3 className="text-sm font-semibold text-primary">Billing & Payment Methods</h3>
                    <div className="flex flex-col space-y-3.5">
                         <p className="text-xs font-semibold text-primary">Payment Methods</p>
                         <div className="flex flex-col space-y-1.5">
                              <div className="space-y-3">
                                   <div className="flex flex-row items-center justify-between p-3 border rounded-lg border-btGray">
                                        <div className="flex items-center gap-2 flow-row">
                                             <div className="bg-pointBg flex w-fit cursor-pointer items-center justify-center rounded-lg p-1.5 shadow">
                                                  <Image src="/credit-card.svg" alt="logo" width={16} height={16} />
                                             </div>
                                             <div className="flex flex-col">
                                                  <p className="text-xs font-semibold text-primary">Visa ending in 2177</p>
                                                  <span className="font-medium text-btext text-xxs">Expires 08/2025</span>
                                             </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-2">
                                             <button className="px-2 py-1 text-xs font-medium text-white rounded-full bg-primary">Default</button>
                                             <button className="border-btGray text-primary hover:text-btBlue hover:border-btBlue cursor-pointer rounded-lg border p-1.5 text-xs font-medium hover:font-semibold">Edit</button>
                                             <button className="text-xs font-medium cursor-pointer text-primary hover:font-semibold hover:text-red-900">Remove</button>
                                        </div>
                                   </div>
                                   <div className="flex flex-row items-center justify-between p-3 border rounded-lg border-btGray">
                                        <div className="flex items-center gap-2 flow-row">
                                             <div className="bg-pointBg flex w-fit cursor-pointer items-center justify-center rounded-lg p-1.5 shadow">
                                                  <Image src="/credit-card.svg" alt="logo" width={16} height={16} />
                                             </div>
                                             <div className="flex flex-col">
                                                  <p className="text-xs font-semibold text-primary">Mastercard ending in 4612</p>
                                                  <span className="font-medium text-btext text-xxs">Expires 03/2028</span>
                                             </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-2">
                                             <button className="text-primary border-btGray hover:bg-primary cursor-pointer rounded-lg border p-1.5 text-xs font-medium hover:text-white">Set as Default</button>
                                             <button className="border-btGray text-primary hover:text-btBlue hover:border-btBlue cursor-pointer rounded-lg border p-1.5 text-xs font-medium hover:font-semibold">Edit</button>
                                             <button className="text-xs font-medium cursor-pointer text-primary hover:font-semibold hover:text-red-900">Remove</button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="border-btGray flex w-fit cursor-pointer flex-row items-center gap-1.5 rounded-lg border bg-white p-1.5">
                              <Image src="/credit-card.svg" alt="logo" width={16} height={16} />
                              <span className="text-xs font-medium text-primary">Add New Card</span>
                         </div>
                    </div>
                    <div className="w-full h-px bg-btGray"></div> {/* divider */}
                    <div className="flex flex-col space-y-3.5">
                         <p className="text-xs font-semibold text-primary">In-App Notifications</p>
                         <form className="space-y-3">
                              <div className="grid grid-cols-2 space-x-2">
                                   <div className="flex flex-col gap-2">
                                        <label className="block text-xs font-medium text-primary">Name</label>
                                        <input type="text" placeholder="Sidiat Bruma" className="w-full px-4 py-2 border rounded-lg border-sLine outline-0 placeholder:text-xs placeholder:font-medium" />
                                   </div>
                                   <div className="flex flex-col gap-2">
                                        <label className="block text-xs font-medium text-primary">Email</label>
                                        <input type="email" placeholder="Sidiatbruma@gmail.com" className="w-full px-4 py-2 border rounded-lg border-sLine outline-0 placeholder:text-xs placeholder:font-medium" />
                                   </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                   <label className="block text-xs font-medium text-primary">Business Address</label>
                                   <textarea name="bio" id="bio" cols="3" placeholder="123 Queens Road, Suite 101 Neville, CA 90210 United States" className="w-full px-4 py-2 border rounded-lg border-sLine outline-0 placeholder:text-xs placeholder:font-medium"></textarea>
                              </div>
                              <div className="grid grid-cols-3 space-x-2">
                                   <div className="flex flex-col gap-2">
                                        <label className="block text-xs font-medium text-primary">City</label>
                                        <input type="text" placeholder="San Jose" className="w-full px-4 py-2 border rounded-lg border-sLine outline-0 placeholder:text-xs placeholder:font-medium" />
                                   </div>
                                   <div className="flex flex-col gap-2">
                                        <label className="block text-xs font-medium text-primary">State/Province</label>
                                        <input type="text" placeholder="California" className="w-full px-4 py-2 border rounded-lg border-sLine outline-0 placeholder:text-xs placeholder:font-medium" />
                                   </div>
                                   <div className="flex flex-col gap-2">
                                        <label className="block text-xs font-medium text-primary">ZIP/Postal Code</label>
                                        <input type="text" placeholder="9332" className="w-full px-4 py-2 border rounded-lg border-sLine outline-0 placeholder:text-xs placeholder:font-medium" />
                                   </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                   <label className="block text-xs font-medium text-primary">Country</label>
                                   <input type="text" placeholder="United States" className="w-full px-4 py-2 border rounded-lg border-sLine outline-0 placeholder:text-xs placeholder:font-medium" />
                                   <span className="font-semibold text-red-900 text-xxs">NB: this will be a dropdown of countries to be add later</span>
                              </div>
                         </form>
                    </div>
                    <div className="w-full h-px bg-btGray"></div> {/* divider */}
                    <div className="flex flex-col space-y-3.5">
                         <p className="text-xs font-semibold text-primary">Billing History</p>
                         <div className="min-w-full border rounded-lg shadow-sm border-btGray">
                              <table className="min-w-[600px] md:min-w-full text-left text-sm bg-white">
                                   <thead className="text-btext bg-theadBg">
                                        <tr className="text-xs font-medium text-primary">
                                             <th className="px-4 py-3">Invoice</th>
                                             <th className="px-4 py-3">Amount</th>
                                             <th className="px-4 py-3">Date</th>
                                             <th className="px-4 py-3">Actions</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {billingHistory.map((item, index) => (
                                             <tr key={index} className="text-xs font-medium border-t border-gray-100 text-primary">
                                                  <td className="px-4 py-3">{item.invoice}</td>
                                                  <td className="px-4 py-3">{item.amount}</td>
                                                  <td className="px-4 py-3">{item.date}</td>
                                                  <td className="px-4 py-3">{item.actions}</td>
                                                  {/* this to be split into spans of "View" and "Download" */}
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </div>
                    </div>
               </div>
          </section>
     );
}
