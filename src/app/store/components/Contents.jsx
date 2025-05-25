"use client";
import { useState } from "react";
import pdfFiles from "@/app/constants/pdfFiles";

const ITEMS_PER_PAGE = 12;

export default function Contents() {
     const [currentPage, setCurrentPage] = useState(1);

     const totalPages = Math.ceil(pdfFiles.length / ITEMS_PER_PAGE);

     const paginatedFiles = pdfFiles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

     const handlePrev = () => {
          if (currentPage > 1) setCurrentPage(currentPage - 1);
     };

     const handleNext = () => {
          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
     };

     return (
          <div className="h-full w-3/4 space-y-5 rounded-lg border bg-white p-4">
               <div className="flex w-full items-center gap-2">
                    <p className="text-primary text-lg font-semibold">All Products</p>
                    <span className="text-primary border-btGray rounded-sm border px-1.5 py-[1px] text-xs font-medium">{pdfFiles.length} items</span>
               </div>

               <div className="grid grid-cols-3 gap-4">
                    {paginatedFiles.map((file, idx) => (
                         <div key={idx} className="space-y-2 rounded-md border p-3 shadow-sm">
                              <img src={file.previewImageUrl} alt={file.title} width={60} height={60} />
                              <h3 className="truncate text-sm font-bold">{file.title}</h3>
                         </div>
                    ))}
               </div>

               {/* Pagination Controls */}
               <div className="flex justify-center gap-4 pt-4">
                    <button onClick={handlePrev} disabled={currentPage === 1} className="rounded border px-4 py-1 disabled:opacity-50">
                         Previous
                    </button>
                    <span className="font-medium">
                         Page {currentPage} of {totalPages}
                    </span>
                    <button onClick={handleNext} disabled={currentPage === totalPages} className="rounded border px-4 py-1 disabled:opacity-50">
                         Next
                    </button>
               </div>
          </div>
     );
}

// import Image from "next/image";
// import pdfFiles from "@/app/constants/pdfFiles";

// export default function Contents() {
//      return (
//           <div className="w-3/4 h-full bg-white space-y-5 rounded-lg border p-4">
//                <div className="w-full flex items-center gap-2">
//                     <p className="font-semibold text-lg text-primary">All Products</p>
//                     <span className="font-medium text-xs text-primary border border-btGray px-1.5 py-[1px] rounded-sm">
//                          {pdfFiles.length} items
//                     </span>
//                </div>

//                <div className="grid grid-cols-3 gap-4">
//                     {pdfFiles.map((file, idx) => (
//                          <div key={idx} className="border rounded-md p-3 shadow-sm space-y-2">
//                               <img src={file.previewImageUrl} alt={file.title} width={60} height={60} />
//                               <h3 className="text-sm font-bold truncate">{file.title}</h3>
//                               <a href={file.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline">
//                                    View PDF
//                               </a>
//                          </div>
//                     ))}
//                </div>
//           </div>
//      );
// }
