import React from "react";

const dummyPointsHistory = [
  { transaction: "Earned", date: "April 16, 2025", description: "Order ORD-3091 completed", points: 25 },
  { transaction: "Earned", date: "April 12, 2025", description: "Referral bonus - Larry Scott", points: 50 },
  { transaction: "Earned", date: "April 3, 2025", description: "Order ORD-2131 completed", points: 25 },
  { transaction: "Redeemed", date: "April 3, 2025", description: "Redeemed for $10 discount", points: -100 },
  { transaction: "Earned", date: "March 28, 2025", description: "Welcome bonus", points: 100 },
  { transaction: "Earned", date: "March 19, 2025", description: "Order ORD-3091 completed", points: 25 },
  { transaction: "Earned", date: "March 15, 2025", description: "Order ORD-3091 completed", points: 25 },
  { transaction: "Redeemed", date: "March 11, 2025", description: "Redeemed for free rush service", points: -50 },
];

export default function LHistory({ historyData = dummyPointsHistory }) {
  return (
    <div className="bg-cardBg3 border-btGray max-h-full w-full rounded-[14px] border">
      <div className="mx-auto flex w-[92%] flex-col space-y-4 py-5">
        <h3 className="text-primary text-sm font-semibold">Points History</h3>

        <div className="border-btGray overflow-hidden rounded-[10px] border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="divide-btGray min-w-full divide-y">
              <thead className="bg-cardBg">
                <tr>
                  <th scope="col" className="text-primary px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                    Transaction
                  </th>
                  <th scope="col" className="text-primary px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                    Date
                  </th>
                  <th scope="col" className="text-primary px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                    Description
                  </th>
                  <th scope="col" className="text-primary px-6 py-3 text-right text-xs font-medium tracking-wider uppercase">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="divide-btGray divide-y bg-white">
                {historyData.map((item, index) => (
                  <tr key={index}>
                    <td className="text-primary px-6 py-4 text-xs font-medium whitespace-nowrap">{item.transaction}</td>
                    <td className="text-btext px-6 py-4 text-xs whitespace-nowrap">{item.date}</td>
                    <td className="text-btext px-6 py-4 text-xs whitespace-nowrap">{item.description}</td>
                    <td className={`px-6 py-4 text-right text-xs font-medium whitespace-nowrap ${item.points >= 0 ? "text-green-500" : "text-btext"}`}>{item.points >= 0 ? `+${item.points}` : item.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {historyData.length === 0 && <div className="text-btext p-4 text-center">No points history available.</div>}
        </div>
      </div>
    </div>
  );
}
