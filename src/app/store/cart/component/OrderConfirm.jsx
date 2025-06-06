"use client";
import { useEffect, useState } from "react";
import { CheckCircle, Download } from "lucide-react";
import Link from "next/link";
import { fetchPdfsFromCloudinary } from "@/app/constants/pdfContent";

export default function OrderConfirm({ cartItems = [] }) {
  const [matchedFiles, setMatchedFiles] = useState([]);

  useEffect(() => {
    const searchMatchingPdfs = async () => {
      const itemNames = cartItems.map((item) =>
        item.original_filename ? item.original_filename.replace(/\s+/g, "_") : "Unnamed_Item"
      );

      const cloudinaryFiles = await fetchPdfsFromCloudinary();

      const matched = cloudinaryFiles.filter((file) =>
        itemNames.some((name) => file.public_id.includes(name))
      );

      setMatchedFiles(matched);
    };

    if (cartItems.length > 0) {
      searchMatchingPdfs();
    }
  }, [cartItems]);



  return (
    <div className="absolute inset-0 flex items-center justify-center px-4 md:px-0">
      <div className="bg-white w-full max-w-md rounded-[18px] px-4 py-8 shadow-2xl text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">Order Confirmed</h2>
        <p className="text-sm text-gray-500 mb-2">Download your PDFs below:</p>
        <div className="space-y-2 mb-4">
          {matchedFiles.map((file, idx) => (
            <div key={idx} className="flex flex-row justify-between items-center border border-btGray p-3 rounded-xl">
              <a href={`https://res.cloudinary.com/dihhljibk/${file.public_id}.pdf`} target="_blank" download className="block w-full text-sm text-left transition">
                {file.public_id.split("/").pop()}
              </a>
              <Download size={20} />
            </div>
          ))}
        </div>
        <Link href="/store">
          <button className="w-full cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}