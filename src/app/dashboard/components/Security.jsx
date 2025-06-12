import Image from "next/image";

export default function Security() {
     const accountHistory = [
          { activity: "Login", location: "Los Angeles, CA, USA", date: "Today, 10:30 AM" },
          { activity: "Password Changed", location: "Los Angeles, CA, USA", date: "April 10, 2025, 2:15 PM" }
     ];

     return (
          <section className="bg-cardBg3 border-btGray max-h-full w-full rounded-[10px] border">
               <div className="mx-auto flex w-[92%] flex-col space-y-5 py-5">
                    <h3 className="text-sm font-semibold text-primary">Security Settings</h3>
                    <div className="flex flex-col space-y-3.5">
                         <p className="text-xs font-semibold text-primary">Change Password</p>
                         <form className="space-y-3">
                              <div className="flex flex-col gap-2">
                                   <label className="block text-xs font-medium text-primary">Current Password</label>
                                   <input type="password" placeholder="" className="w-full px-4 py-2 border rounded-lg border-sLine outline-0 placeholder:text-xs placeholder:font-medium" />
                              </div>
                              <div className="grid grid-cols-2 space-x-2">
                                   <div className="flex flex-col gap-2">
                                        <label className="block text-xs font-medium text-primary">New Password</label>
                                        <input type="password" placeholder="" className="w-full px-4 py-2 border rounded-lg border-sLine outline-0 placeholder:text-xs placeholder:font-medium" />
                                        <span className="text-btext text-xxs">Password must be at least 8 characters long and include a mix of letters, numbers, and special characters.</span>
                                   </div>
                                   <div className="flex flex-col gap-2">
                                        <label className="block text-xs font-medium text-primary">Confirm Password</label>
                                        <input type="password" placeholder="" className="w-full px-4 py-2 border rounded-lg border-sLine outline-0 placeholder:text-xs placeholder:font-medium" />
                                   </div>
                              </div>
                              <button type="submit" className="p-2 text-xs font-medium text-white rounded-lg cursor-pointer hover:font-semibold btn-bg">Update Password</button>
                         </form>
                    </div>
                    <div className="w-full h-px bg-btGray"></div> {/* divider */}
                    <div className="flex flex-col space-y-3.5">
                         <p className="text-xs font-semibold text-primary">Login Sessions</p>
                         <div className="flex flex-col gap-2 p-3 border rounded-lg border-btGray">
                              <div className="flex flex-row items-center gap-1.5">
                                   <Image src="/user-settings.svg" width={16} height={16} alt="user setting" />
                                   <p className="text-xs font-medium text-primary">Current Session</p>
                                   <span className="px-1.5 py-0.5 text-xs font-medium text-white rounded-full bg-primary">Active</span>
                              </div>
                              <div className="flex flex-col gap-1 font-medium text-xxs text-btext">
                                   <p className="">Chrome on Windows • Los Angeles, CA, USA</p>
                                   <span>IP: 192.168.1.1 • Last active: Just now</span>
                              </div>
                         </div>
                         <div className="flex flex-row items-center justify-between p-3 border rounded-lg border-btGray">
                              <div className="flex flex-col gap-2">
                                   <div className="flex flex-row items-center gap-1.5">
                                        <Image src="/user-settings.svg" width={16} height={16} alt="user setting" />
                                        <p className="text-xs font-medium text-primary">Mobile App</p>
                                   </div>
                                   <div className="flex flex-col gap-1 font-medium text-xxs text-btext">
                                        <p className="">iPhone 13 • San Francisco, CA, USA</p>
                                        <span>IP: 192.168.1.2 • Last active: 2 hours ago</span>
                                   </div>
                              </div>
                              <span className="p-1.5 text-xs font-medium rounded-md border border-btGray cursor-pointer hover:text-btBlue hover:border-btBlue text-primary">Active</span>
                         </div>
                         <div className="flex flex-row items-center justify-between p-3 border rounded-lg border-btGray">
                              <div className="flex flex-col gap-2">
                                   <div className="flex flex-row items-center gap-1.5">
                                        <Image src="/user-settings.svg" width={16} height={16} alt="user setting" />
                                        <p className="text-xs font-medium text-primary">Safari</p>
                                   </div>
                                   <div className="flex flex-col gap-1 font-medium text-xxs text-btext">
                                        <p className="">Safari on macOS • New York, NY, USA</p>
                                        <span>IP: 192.168.1.3 • Last active: Yesterday</span>
                                   </div>
                              </div>
                              <span className="p-1.5 text-xs font-medium rounded-md border border-btGray cursor-pointer hover:text-btBlue hover:border-btBlue text-primary">Active</span>
                         </div>
                    </div>
                    <div className="w-full h-px bg-btGray"></div> {/* divider */}
                    <div className="flex flex-col space-y-3.5">
                         <p className="text-xs font-semibold text-primary">Account Activity</p>
                         <div className="min-w-full border rounded-lg shadow-sm border-btGray">
                              <table className="min-w-[600px] md:min-w-full text-left text-sm bg-white">
                                   <thead className="text-btext bg-theadBg">
                                        <tr className="text-xs font-medium text-primary">
                                             <th className="px-4 py-3">Activity</th>
                                             <th className="px-4 py-3">Location</th>
                                             <th className="px-4 py-3">Date & Time</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {accountHistory.map((item, index) => (
                                             <tr key={index} className="text-xs font-medium border-t border-gray-100 text-primary">
                                                  <td className="px-4 py-3">{item.activity}</td>
                                                  <td className="px-4 py-3">{item.location}</td>
                                                  <td className="px-4 py-3">{item.date}</td>
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