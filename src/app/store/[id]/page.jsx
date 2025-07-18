"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Notify, Loading } from "notiflix";
import { fetchImagesFromCloudinary } from "../../constants/imageContent";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useUserPreferences } from "@/context/UserPreferencesContext";
import { defaultPrice } from "../../constants";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { Skeleton } from "../components/Skeleton";

export default function StoreItemPage() {
  const [user, setUser] = useState(null);
  const params = useParams();
  const publicId = params.id;
  const router = useRouter();
  const { addToCart, removeFromCart, cartItems } = useCart();

  const [resource, setResource] = useState(null);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainDisplayImage, setMainDisplayImage] = useState("");

  const { getItemPreferences, updateItemPreferences, preferencesLoading } = useUserPreferences();
  const isInitialPrefLoad = React.useRef(true);

  const getProductPrefsKey = useCallback((id) => `product_prefs_${id}`, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

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
    if (publicId && !preferencesLoading && resource && isInitialPrefLoad.current) {
      const itemPrefs = getItemPreferences(publicId);
      isInitialPrefLoad.current = false;
    }
  }, [publicId, preferencesLoading, getItemPreferences, resource]);

  useEffect(() => {
    if (!publicId) return;
    const fetchDetails = async () => {
      try {
        setError(null);
        const [productResponse, allImages] = await Promise.all([fetch(`/api/cloudinary/${publicId}`), fetchImagesFromCloudinary()]);

        if (!productResponse.ok) {
          const errorData = await productResponse.json();
          throw new Error(errorData.error || `HTTP error! status: ${productResponse.status}`);
        }

        const productData = await productResponse.json();
        setResource(productData);
        setMainDisplayImage(productData.secure_url);

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
    };
  }, [publicId]);

  const calculateDisplayPrice = () => {
    let price = parseFloat(resource.metadata?.price || defaultPrice);

    return price.toFixed(2);
  };

  const isItemInCart = cartItems.some((item) => item.public_id === publicId);

  const handleToggleCart = () => {
    if (!user) {
      Notify.failure("Please sign in to manage your cart.");
      return;
    }

    if (!resource) {
      Notify.warning("Product details not loaded yet.");
      return;
    }

    if (isItemInCart) {
      removeFromCart(resource.public_id);
      Notify.info(`${getDisplayTitle(resource)} removed from cart!`);
    } else {
      addToCart(resource);
      Notify.success(`${getDisplayTitle(resource)} added to cart!`);
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
            <Image src="/arrow-left.svg" alt="Go Back" width={16} height={16} className="mr-1 inline-block" />
            Back to Store
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  if (!resource) {
    return (
      <>
        <div className="relative flex flex-col">
          <Header className="border-btGray border-b" />
          <main className="flex min-h-screen flex-col items-center justify-center space-y-8 p-8 pt-16">
            <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-10">
              <div className="space-y-4 md:col-span-6">
                <Skeleton className="h-80 w-full" />
                <div className="flex space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-20 w-20" />
                  ))}
                </div>
              </div>
              <div className="space-y-4 md:col-span-4">
                <Skeleton className="h-10 w-2/3" />
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
            <div className="grid w-full max-w-5xl grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-56 w-full rounded-lg" />
              ))}
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative flex flex-col">
        <Header className="border-btGray border-b" />
        <main className="min-h-screen flex-1 pt-16">
          <div className="container mx-auto p-4 md:p-8">
            <Link href="/store" className="text-primary hover:text-btBlue mb-6 flex cursor-pointer items-center">
              <Image src="/arrow-left.svg" alt="Go Back" width={16} height={16} className="mr-1 inline-block" />
              Back to Store
            </Link>
            <div className="grid grid-cols-1 gap-8 bg-white md:grid-cols-10">
              {/* Main Product Image & Thumbnails */}
              <div className="md:col-span-6">
                <Image src={mainDisplayImage || mainImagePlaceholder} alt={mainDisplayImage ? getDisplayTitle(resource) : "Loading image"} width={600} height={400} priority className="mb-4 h-auto w-full rounded-lg object-cover shadow-md" />
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {[...Array(1)].map((_, index) => (
                    <Image key={index} src={resource?.secure_url || thumbnailPlaceholder} alt={resource?.secure_url ? `${getDisplayTitle(resource)} thumbnail ${index + 1}` : "Loading thumbnail"} width={80} height={80} className={`cursor-pointer rounded-md border-2 object-cover transition ${mainDisplayImage === resource?.secure_url ? "border-none" : "border-transparent"}`} />
                  ))}
                </div>
              </div>
              {/* Product Details & Options */}
              <div className="space-y-10 md:col-span-4">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="space-y-1">
                      <h1 className="text-primary font-bricolage text-3xl font-bold">{getDisplayTitle(resource)}</h1>
                      <p className="text-primary text-[20px] font-semibold">${calculateDisplayPrice()}</p>
                    </div>
                    <p className="text-btext text-sm">Create a stunning {getDisplayTitle(resource)} with this complete embroidery kit. Perfect for beginners and experienced crafters alike, this kit includes everything you need to create a beautiful piece of handmade art.</p>
                  </div>
                </div>
                <button disabled={!user} onClick={handleToggleCart} className={`w-full rounded-md py-3 text-lg font-semibold text-white transition ${isItemInCart ? "bg-red-600 hover:bg-red-700" : "btn-bg hover:bg-btBlue cursor-pointer"} ${!user && "cursor-not-allowed opacity-50"}`}>
                  {isItemInCart ? "Remove from Cart" : user ? "Add to Cart" : "Login to Add"}
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
                        <Image src={product.secure_url || thumbnailPlaceholder} alt={product.secure_url ? getDisplayTitle(product) : "Loading product"} layout="fill" objectFit="cover" className="absolute inset-0 h-full w-full rounded-lg" />
                      </div>
                      <h3 className="text-primary overflow-hidden text-xs font-semibold text-ellipsis whitespace-nowrap">{getDisplayTitle(product)}</h3>
                      <p className="text-primary text-base font-medium">${parseFloat(product.metadata?.price || defaultPrice).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
