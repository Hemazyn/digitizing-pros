"use client";

export default function OrderProgress({ order }) {
  const timelineEvents = order?.timeline || [
    { id: 1, title: "Order Placed", dateTime: "April 16, 2025 - 10:23 AM", description: "Your order has been received and confirmed." },
    { id: 2, title: "In Queue", dateTime: "April 16, 2025 - 10:25 AM", description: "Your design is in the queue for digitizing." },
    { id: 3, title: "Being Digitized", dateTime: "April 16, 2025 - 2:45 PM", description: "Our experts are working on your design." },
    { id: 4, title: "Final Preview", dateTime: "April 17, 2025 - 9:15 AM", description: "Your design is undergoing final quality checks." },
    { id: 5, title: "Delivered", dateTime: "April 17, 2025 - 11:30 AM", description: "Your digitized files have been delivered to your email and account." },
  ];

  return (
    <div className="bg-cardBg3 space-y-4 rounded-lg p-5">
      <h4 className="text-primary mb-6 text-sm font-semibold">Order Timeline</h4>
      <div className="relative">
        {timelineEvents.map((event, index) => (
          <div key={event.id} className="flex h-25 last:mb-0">
            <div className="mr-4 flex flex-col items-center">
              <div className="bg-btBlue text-md relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold text-white">
                <span className="text-sm">{event.id}</span>
              </div>
              {index < timelineEvents.length - 1 && <div className="border-btBlue h-full flex-grow border-l-2 border-dotted" style={{ minHeight: "40px", marginTop: "-4px", marginBottom: "-4px" }}></div>}
            </div>
            <div className="flex-1 pt-1.5">
              <div className="flex flex-col gap-1">
                <p className="text-primary text-[12px] font-medium">{event.title}</p>
                <p className="text-btext text-[10px] font-medium">{event.dateTime}</p>
              </div>
              <p className="text-primary text-xxs mt-2 font-medium">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
