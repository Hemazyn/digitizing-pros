"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Notify, Loading } from "notiflix";
import { fetchImagesFromCloudinary } from "../../constants/imageContent";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function StoreItemPage() {
  const params = useParams();
  const publicId = params.id;
  const router = useRouter();
  const { addToCart, removeFromCart, cartItems } = useCart();

  const [resource, setResource] = useState(null);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainDisplayImage, setMainDisplayImage] = useState("");

  const [selectedHoopSize, setSelectedHoopSize] = useState('4"');
  const [selectedThreadType, setSelectedThreadType] = useState("Cotton");
  const [quantity, setQuantity] = useState(1);

  const getDisplayTitle = (resource) => {
    if (!resource) return "Untitled Item";
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

  useEffect(() => {
    if (!publicId) return;

    const fetchDetails = async () => {
      Loading.dots("Loading product details...");
      try {
        setError(null);
        const response = await fetch(`/api/cloudinary/${publicId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResource(data);
        setMainDisplayImage(data.secure_url);

        const allImages = await fetchImagesFromCloudinary();
        const filteredRelated = allImages
          .filter((img) => img.public_id !== publicId)
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setRelatedProducts(filteredRelated);
      } catch (err) {
        setError(err.message);
        Notify.failure(`Failed to load product details: ${err.message}`);
      } finally {
        Loading.remove();
      }
    };

    fetchDetails();
    return () => {
      Loading.remove();
      console.log("useEffect cleanup: Loading.remove() called.");
    };
  }, [publicId]);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const isItemInCart = cartItems.some((item) => item.public_id === publicId && item.options.selectedHoopSize === selectedHoopSize && item.options.selectedThreadType === selectedThreadType);

  const handleToggleCart = () => {
    if (!resource) {
      Notify.warning("Product details not loaded yet.");
      return;
    }

    const options = {
      selectedHoopSize,
      selectedThreadType,
    };

    if (isItemInCart) {
      removeFromCart(resource.public_id, options);
      Notify.info(`${quantity} x ${getDisplayTitle(resource)} removed from cart!`);
    } else {
      addToCart(resource, quantity, options);
      Notify.success(`${quantity} x ${getDisplayTitle(resource)} added to cart!`);
    }
  };

  const mainImagePlaceholder = "https://via.placeholder.com/600x400?text=Loading+Image...";
  const thumbnailPlaceholder = "https://via.placeholder.com/80x80?text=Thumb";

  if (error && !resource) {
    return (
      <>
        <Header />
        <main className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center p-8 pt-16 text-red-500">
          <h2 className="text-2xl font-semibold">Error Loading Product</h2>
          <p className="text-lg">{error}</p>
          <Link href="/store" className="mt-4 cursor-pointer text-sm text-gray-600 transition hover:text-violet-700">
            <img src="/arrow-left.svg" alt="Go Back" width={16} height={16} className="mr-1 inline-block" />
            Back to Store
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  if (!resource) {
    return null;
  }

  return (
    <>
      <Header className="border-btGray border-b" />
      <main className="min-h-screen flex-1 pt-16">
        <div className="container mx-auto p-4 md:p-8">
          <Link href="/store" className="text-primary hover:text-btBlue mb-6 flex cursor-pointer items-center">
            <img src="/arrow-left.svg" alt="Go Back" width={16} height={16} className="mr-1 inline-block" />
            Back to Store
          </Link>
          <div className="grid grid-cols-1 gap-8 bg-white md:grid-cols-10">
            <div className="md:col-span-6">
              <img src={mainDisplayImage || mainImagePlaceholder} alt={mainDisplayImage ? getDisplayTitle(resource) : "Loading image"} className="mb-4 h-auto w-full rounded-lg object-cover shadow-md" />
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {[...Array(4)].map((_, index) => (
                  <img key={index} src={resource?.secure_url || thumbnailPlaceholder} alt={resource?.secure_url ? `${getDisplayTitle(resource)} thumbnail ${index + 1}` : "Loading thumbnail"} className={`h-20 w-20 cursor-pointer rounded-md border-2 object-cover transition ${mainDisplayImage === resource?.secure_url ? "border-none" : "border-transparent"}`} />
                ))}
              </div>
            </div>
            <div className="space-y-5 md:col-span-4">
              <div className="space-y-5">
                <div className="space-y-1">
                  <div className="space-y-1">
                    <h1 className="text-primary font-bricolage text-3xl font-bold">{getDisplayTitle(resource)}</h1>
                    <p className="text-primary text-[20px] font-semibold">${resource.metadata?.price || "2.99"}</p>
                  </div>
                  <p className="text-btext text-sm">Create a stunning {getDisplayTitle(resource)} with this complete embroidery kit. Perfect for beginners and experienced crafters alike, this kit includes everything you need to create a beautiful piece of handmade art.</p>
                </div>
                <div className="space-y-3 md:space-y-7">
                  <div className="space-y-0 md:space-y-2.5">
                    <h3 className="text-lg font-semibold text-gray-800">Hoop Size</h3>
                    <div className="flex space-x-3">
                      {['4"', '6"', '8"'].map((size) => (
                        <label key={size} className="flex cursor-pointer items-center space-x-2">
                          <input type="radio" name="hoopSize" value={size} checked={selectedHoopSize === size} onChange={() => setSelectedHoopSize(size)} className="form-radio h-4 w-4 cursor-pointer accent-black" />
                          <span className="text-gray-700">{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-0 md:space-y-2.5">
                    <h3 className="text-lg font-semibold text-gray-800">Thread Type</h3>
                    <div className="flex space-x-3">
                      {["Cotton", "Silk (+$5.00)"].map((type) => (
                        <label key={type} className="flex cursor-pointer items-center space-x-2">
                          <input type="radio" name="threadType" value={type} checked={selectedThreadType === type} onChange={() => setSelectedThreadType(type)} className="form-radio h-4 w-4 cursor-pointer accent-black" />
                          <span className="text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleQuantityChange(-1)} className="cursor-pointer rounded-md border border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-100">
                      -
                    </button>
                    <span className="text-xl font-medium">{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)} className="cursor-pointer rounded-md border border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-100">
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button onClick={handleToggleCart} className={`w-full rounded-md py-3 text-lg font-semibold text-white transition ${isItemInCart ? "bg-red-600 hover:bg-red-700" : "bg-btBlue hover:bg-btBlue/90 cursor-pointer"}`}>
                {isItemInCart ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
          {relatedProducts.length > 0 && (
            <section className="mt-8 md:mt-12">
              <h2 className="text-primary mb-2 text-lg font-semibold">You May Also Like</h2>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {relatedProducts.map((product) => (
                  <div
                    key={product.public_id}
                    onClick={() => {
                      const encodedPublicId = encodeURIComponent(product.public_id);
                      router.push(`/store/${encodedPublicId}`);
                    }}
                    className="cursor-pointer space-y-3 rounded-lg p-2 shadow transition hover:shadow-md">
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                      <img src={product.secure_url || thumbnailPlaceholder} alt={product.secure_url ? getDisplayTitle(product) : "Loading product"} className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                    <h3 className="text-primary overflow-hidden text-xs font-semibold text-ellipsis whitespace-nowrap">{getDisplayTitle(product)}</h3>
                    <p className="text-primary text-base font-medium">${product.metadata?.price || "2.99"}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
