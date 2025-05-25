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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M12.897 2.557a1 1 0 0 0-1.794 0L8.691 7.445l-5.394.784a1 1 0 0 0-.555 1.706l3.904 3.805l-.922 5.372a1 1 0 0 0 1.451 1.054L12 17.63l4.825 2.536a1 1 0 0 0 1.45-1.054l-.92-5.372l3.902-3.805a1 1 0 0 0-.554-1.706l-5.394-.784l-2.412-4.888z" fill="#4538CB" /></g></svg>
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
                              <article key={idx} className="snap-start flex-shrink-0 items-start w-72 sm:w-80 bg-white border border-tLine rounded-3xl shadow-md p-6 flex flex-col" tabIndex={0} aria-label={`Testimonial from ${t.name}`}  >
                                   <div className="flex space-x-1 mb-3" aria-hidden="true">
                                        {Array.from({ length: t.stars }).map((_, i) => (
                                             <Star key={i} />
                                        ))}
                                   </div>
                                   <p className="flex-grow text-gray-700 text-base mb-4 text-start">“{t.text}”</p>
                                   <p className="text-[#4538CB] font-semibold text-lg">{t.name}</p>
                              </article>
                         ))}
                    </div>
               </div>
          </section>
     );
}