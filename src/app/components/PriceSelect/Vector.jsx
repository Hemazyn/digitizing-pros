import Image from "next/image";

export default function Vector() {
  const data = [
    { quantity: "10+", type: "Simple Designs", price: "$5", savings: "Save $2 each" },
    { quantity: "10+", type: "Moderate Designs", price: "$13", savings: "Save $2 each" },
    { quantity: "10+", type: "Complex Designs", price: "$18", savings: "Save $2 each" },
    { quantity: "20+", type: "Simple Designs", price: "$4.5", savings: "Save $2.5 each" },
    { quantity: "20+", type: "Moderate Designs", price: "$12.5", savings: "Save $2.5 each" },
    { quantity: "20+", type: "Complex Designs", price: "$17.5", savings: "Save $2.5 each" },
  ];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-0 md:px-8 md:py-8 lg:px-16">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {[
          {
            title: "Simple Design",
            subtitle: "Per design only",
            price: "$7",
            features: ["Simple Shapes", "Few Colors", "Simple Text"]
          },
          {
            title: "Moderate Design",
            subtitle: "Per design only",
            price: "$15",
            features: ["Moderate complexity", "Multiple colors", "Detailed elements"]
          },
          {
            title: "Complex Design",
            subtitle: "Per design (10+ designs)",
            price: "$20",
            features: ["Highly detailed", "Many colors", "Complex illustrations"]
          },
        ].map(({ title, subtitle, price, features }, i) => (
          <div key={i} className="flex flex-col rounded-xl bg-white shadow-sm">
            <div className="bg-cardBg border-sLine flex flex-col gap-3 rounded-t-xl border-b p-6">
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              <p className="text-sm font-medium text-gray-500">{subtitle}</p>
              <span className="text-3xl font-semibold text-gray-900">{price}</span>
            </div>
            <ul className="flex flex-1 flex-col justify-center space-y-3 p-6">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Image src="/checkmark.svg" alt="checkmark" width={16} height={16} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <section>
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 md:text-3xl">Bulk Order Discounts – Vector Services</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <thead className="bg-theadBg text-gray-600">
              <tr>
                <th className="text-primary px-4 py-3 text-xs font-medium tracking-wider uppercase">Quantity</th>
                <th className="text-primary px-4 py-3 text-xs font-medium tracking-wider uppercase">Type</th>
                <th className="text-primary px-4 py-3 text-xs font-medium tracking-wider uppercase">Price</th>
                <th className="text-success px-4 py-3 text-xs font-medium tracking-wider uppercase">Savings</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className={`border-t border-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                  <td className="text-primary px-4 py-3 text-xs font-medium whitespace-nowrap">{item.quantity}</td>
                  <td className="text-primary px-4 py-3 text-xs font-medium whitespace-nowrap">{item.type}</td>
                  <td className="text-primary px-4 py-3 text-xs font-medium whitespace-nowrap">{item.price}</td>
                  <td className="text-success px-4 py-3 text-xs font-medium whitespace-nowrap">{item.savings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
