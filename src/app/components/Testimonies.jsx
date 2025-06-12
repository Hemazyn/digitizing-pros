import React from "react";

export default function Testimonies() {
  const testimonials = [
    {
      stars: 5,
      text: "As someone who needs precise embroidery for high-end fashion pieces, I can't recommend Digitizing Pros enough. They understand my vision perfectly.",
      name: "Teanna Monet",
    },
    {
      stars: 5,
      text: "The quality of digitizing is exceptional. My designs stitch out perfectly every time, and the turnaround time is unbeatable.",
      name: "Aaron Ludstorm",
    },
    {
      stars: 5,
      text: "I've tried many digitizing services, but Digitizing Pros is by far the best. Their attention to detail and customer service is outstanding.",
      name: "Becky Raymond",
    },
  ];
  const Star = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M12.897 2.557a1 1 0 0 0-1.794 0L8.691 7.445l-5.394.784a1 1 0 0 0-.555 1.706l3.904 3.805l-.922 5.372a1 1 0 0 0 1.451 1.054L12 17.63l4.825 2.536a1 1 0 0 0 1.45-1.054l-.92-5.372l3.902-3.805a1 1 0 0 0-.554-1.706l-5.394-.784l-2.412-4.888z" fill="#4538CB" />
      </g>
    </svg>
  );

  return (
    <section className="bg-white py-6 md:py-12" aria-label="Client testimonials">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-primary text-2xl font-bold md:text-3xl">What Our Clients Say</h2>
        <p className="text-btext mx-auto mt-1 max-w-xl text-sm md:mt-2">Don't just take our word for it - hear from our satisfied customers</p>
        <div className="mt-5 flex snap-x snap-mandatory justify-start space-x-6 overflow-x-auto px-2 sm:px-0 md:mt-10 md:justify-center">
          {testimonials.map((t, idx) => (
            <article key={idx} className="border-tLine flex w-72 flex-shrink-0 snap-start flex-col items-start rounded-3xl border bg-white p-4 shadow-md md:p-6" tabIndex={0} aria-label={`Testimonial from ${t.name}`}>
              <div className="mb-3 flex space-x-1" aria-hidden="true">
                {Array.from({ length: t.stars }).map((_, i) => (<Star key={i} />))}
              </div>
              <p className="text-btext mb-4 flex-grow text-start text-sm md:text-base">“{t.text}”</p>
              <p className="text-base font-semibold text-[#4538CB] md:text-lg">
                {t.name.split(" ")[0]} {t.name.split(" ")[1]?.[0]}.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
