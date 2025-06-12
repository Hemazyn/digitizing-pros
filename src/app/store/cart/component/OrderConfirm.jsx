"use client";
import { useEffect, useState } from "react";
import { CheckCircle, Download } from "lucide-react";
import Link from "next/link";
import { fetchPdfsFromCloudinary } from "@/app/constants/pdfContent";

export default function OrderConfirm({ cartItems = [] }) {
  const [matchedFiles, setMatchedFiles] = useState([]);

  useEffect(() => {
    const searchMatchingPdfs = async () => {
      const itemNames = cartItems.map((item) => (item.original_filename ? item.original_filename.replace(/\s+/g, "_") : "Unnamed_Item"));
      const cloudinaryFiles = await fetchPdfsFromCloudinary();
      const matched = cloudinaryFiles.filter((file) => itemNames.some((name) => file.public_id.includes(name)));
      setMatchedFiles(matched);
    };
    if (cartItems.length > 0) {
      searchMatchingPdfs();
    }
  }, [cartItems]);

  return (
    <div className="absolute inset-0 flex items-center justify-center px-4 md:px-0">
      <div className="w-full max-w-md rounded-[18px] bg-white px-4 py-8 text-center shadow-2xl">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h2 className="text-lg font-bold text-gray-800">Order Confirmed</h2>
        <p className="mb-4 text-sm text-gray-500">Download your PDFs below:</p>
        <div className="mb-4 space-y-2">
          {matchedFiles.map((file, idx) => (
            <div key={idx} className="border-btGray text-primary hover:text-btBlue hover:border-btBlue flex flex-row items-center justify-between rounded-xl border p-3">
              <a href={`https://res.cloudinary.com/dihhljibk/${file.public_id}.pdf`} target="_blank" download className="block w-full text-left text-sm transition">
                <div className="flex flex-row items-center justify-between">
                  <span className="font-semibold">{file.public_id.split("/").pop()}</span>
                  <Download size={20} alt="download" />
                </div>
              </a>
            </div>
          ))}
        </div>
        <Link href="/store">
          <button className="btn-bg w-full cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-white transition">Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
}
