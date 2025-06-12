"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchImagesFromCloudinary } from "../../constants/imageContent";
// import { fetchPdfsFromCloudinary } from "../../constants/pdfContent";
import { Notify, Loading } from "notiflix";
import Image from "next/image";
import { defaultPrice } from "../../constants";

const ITEMS_PER_PAGE = 12;

export default function Contents({ searchTerm }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  // const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        Loading.standard("Fetching Products...");
        const fetchedImages = await fetchImagesFromCloudinary();
        // const fetchedPdfs = await fetchPdfsFromCloudinary();
        setImages(fetchedImages);
        // setPdfs(fetchedPdfs);
      } catch (err) {
        setError(err.message);
        Notify.failure("Error", `Failed to fetch content: ${err.message}`, "Okay");
      } finally {
        setLoading(false);
        Loading.remove();
      }
    };

    fetchData();
  }, []);

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

  const filteredImages = searchTerm ? images.filter((img) => getDisplayTitle(img).toLowerCase().includes(searchTerm.toLowerCase())) : images;
  const totalImages = filteredImages.length;
  const totalPages = Math.ceil(totalImages / ITEMS_PER_PAGE);
  const paginatedImages = searchTerm ? filteredImages : filteredImages.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
          <div key={idx} onClick={() => handleClickItem(image)} className="cursor-pointer space-y-3 rounded-[16px] p-2 shadow transition hover:shadow-md">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image src={image.secure_url} alt={getDisplayTitle(image)} layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <h3 className="text-primary overflow-hidden text-xs font-semibold text-ellipsis whitespace-nowrap">{getDisplayTitle(image)}</h3>
            <p className="text-primary text-base font-medium">${parseFloat(image.metadata?.price || defaultPrice).toFixed(2)}</p>
          </div>
        ))}
      </div>
      {!searchTerm && (
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
      )}
    </div>
  );
}
