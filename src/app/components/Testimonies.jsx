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
          <svg className="w-5 h-5 text-[#4538CB]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" >
               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.92-.755 1.688-1.54 1.118L10 13.347l-3.37 2.448c-.785.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.363-1.118L3.642 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.287-3.957z" />
          </svg>
     );

     return (
          <section className="py-12 bg-white" aria-label="Client testimonials"  >
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">What Our Clients Say</h2>
                    <p className="mt-2 text-gray-500 max-w-xl mx-auto">
                         Don't just take our word for it - hear from our satisfied customers
                    </p>

                    <div className="mt-10 flex overflow-x-auto justify-start md:justify-center space-x-6 snap-x snap-mandatory px-2 sm:px-0">
                         {testimonials.map((t, idx) => (
                              <article key={idx} className="snap-start flex-shrink-0 w-72 sm:w-80 bg-white border border-tLine rounded-3xl shadow-md p-6 flex flex-col" tabIndex={0} aria-label={`Testimonial from ${t.name}`}  >
                                   <div className="flex space-x-1 mb-3" aria-hidden="true">
                                        {Array.from({ length: t.stars }).map((_, i) => (
                                             <Star key={i} />
                                        ))}
                                   </div>
                                   <p className="flex-grow text-gray-700 text-base mb-4">“{t.text}”</p>
                                   <p className="text-[#4538CB] font-semibold text-lg">{t.name}</p>
                              </article>
                         ))}
                    </div>
               </div>
          </section>
     );
}