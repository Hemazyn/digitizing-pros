"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchImagesFromCloudinary } from "../../constants/imageContent";
import { fetchPdfsFromCloudinary } from "../../constants/pdfContent";
import { Report, Loading } from "notiflix";

const ITEMS_PER_PAGE = 12;

export default function Contents() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        Loading.standard("Fetching content...");
        const fetchedImages = await fetchImagesFromCloudinary();
        const fetchedPdfs = await fetchPdfsFromCloudinary();
        setImages(fetchedImages);
        setPdfs(fetchedPdfs);
      } catch (err) {
        setError(err.message);
        Report.failure("Error", `Failed to fetch content: ${err.message}`, "Okay");
      } finally {
        setLoading(false);
        Loading.remove();
      }
    };

    fetchData();
  }, []);

  const totalImages = images.length;
  const totalPages = Math.ceil(totalImages / ITEMS_PER_PAGE);
  const paginatedImages = images.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

  const getDisplayTitle = (resource) => {
    if (resource.original_filename && resource.original_filename.trim() !== "") {
      const parts = resource.original_filename.split(".");
      if (parts.length > 1) {
        parts.pop();
        return parts.join(".");
      }
      return resource.original_filename;
    }

    if (resource.public_id) {
      const parts = resource.public_id.split("/");
      const filenameWithExtension = parts[parts.length - 1];
      const filenameParts = filenameWithExtension.split(".");
      if (filenameParts.length > 1) {
        filenameParts.pop();
      }
      return filenameParts.join(".").replace(/-/g, " ");
    }

    return "Untitled Item";
  };

  const handleClickItem = (resource) => {
    const encodedPublicId = encodeURIComponent(resource.public_id);
    router.push(`/store/${encodedPublicId}`);
  };

  if (loading) {
    return <div className="hidden"></div>;
  }

  if (error) {
    return <div className="hidden"></div>;
  }

  return (
    <div className="w3/4 h-full w-full space-y-5 bg-white">
      <div className="flex w-full items-center gap-2">
        <p className="text-primary text-lg font-semibold">All Products</p>
        <span className="text-primary border-btGray rounded-full border px-1.5 py-[1px] text-xs font-medium">{totalImages} items</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {paginatedImages.map((image, idx) => (
          <div key={idx} onClick={() => handleClickItem(image)} className="cursor-pointer space-y-3 rounded-lg p-2 shadow transition hover:shadow-md">
            <img src={image.secure_url} alt={getDisplayTitle(image)} height={228} className="w-fit rounded-lg" />
            <h3 className="text-primary overflow-hidden text-xs font-semibold text-ellipsis whitespace-nowrap">{getDisplayTitle(image)}</h3>
            <p className="text-primary text-base font-medium">$2.99</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button onClick={handlePrev} disabled={currentPage === 1} className="cursor-pointer rounded border px-4 py-1 text-sm disabled:opacity-50">
          Previous
        </button>
        <span className="text-xs font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages} className="cursor-pointer rounded border px-4 py-1 text-sm disabled:opacity-50">
          Next
        </button>
      </div>

      {pdfs.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">PDF Documents</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pdfs.map((pdf, index) => (
              <div key={index} className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
                <a href={pdf.secure_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {getDisplayTitle(pdf) || "Untitled PDF"}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
