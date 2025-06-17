"use client";
import { Download } from "lucide-react";

export default function OrderFiles({ order }) {
  return (
    <div className="bg-cardBg3 space-y-4 rounded-lg p-4">
      <h4 className="text-primary text-md mb-3 font-semibold">Download Files</h4>

      {order.files && order.files.length > 0 ? (
        <div className="space-y-3">
          {order.files.map((file, index) => (
            <div key={index} className="border-btGray flex flex-col items-start justify-between gap-3 rounded-lg border bg-white p-4 shadow-sm md:flex-row md:items-center md:gap-0">
              {/* File Info */}
              <div className="flex w-full items-center gap-3 md:w-auto">
                {/* File Icon (generic document icon from Lucide React if available, or placeholder) */}
                <span className="text-btBlue bg-btBlue/10 flex-shrink-0 rounded-md p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  </svg>
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-primary text-xs font-semibold">{file.name}</span>
                  <span className="text-btext text-xxs font-medium">33.48 MB · June 05, 2025</span>
                </div>
              </div>

              <a href={file.url} target="_blank" rel="noopener noreferrer" className="bg-pointBg text-primary hover:text-btBlue border-btGray flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium">
                <Download size={16} />
                <span>Download</span>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-btext py-4 text-center text-sm">No files available for this order yet.</p>
      )}
      {/* "Need a different format?" section */}
      <div className="border-btGray mt-8 flex flex-col items-center justify-center border-t pt-8 text-center">
        <p className="text-btext mb-4 text-sm">Need a different file format? Contact our support team.</p>
        <button className="btn-bg flex items-center justify-center gap-2 rounded-md px-6 py-2.5 text-sm font-medium text-white shadow transition-opacity hover:opacity-90">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
          <span>Request Format</span>
        </button>
      </div>
    </div>
  );
}
