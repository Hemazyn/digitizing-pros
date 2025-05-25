import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Aside() {
     const [showCategories, setShowCategories] = useState(true);
     const [showPrice, setShowPrice] = useState(true);
     const [priceRange, setPriceRange] = useState([0, 1000]);
     const [showTags, setShowTags] = useState(true);

     const tags = ["Corporate", "Floral", "Sports", "Monogram", "Animals", "Holidays", "Vintage", "Children", "Custom"];

     return (
          <div className="flex h-full w-1/4 flex-col gap-5 bg-white">
               <div className="flex w-full flex-row items-center justify-between">
                    <p className="text-primary text-base font-medium">Filters</p>
                    <span className="text-primary border-btGray cursor-pointer rounded-sm border px-1.5 py-[1px] text-sm font-medium">Reset</span>
               </div>
               <div className="divide-btGray flex flex-col divide-y-2">
                    {/* Categories */}
                    <div className="py-4">
                         <div className="flex cursor-pointer items-center justify-between" onClick={() => setShowCategories(!showCategories)}>
                              <p className="text-primary text-base font-semibold">Categories</p>
                              {showCategories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                         </div>
                         {showCategories && (
                              <div className="mt-4 space-y-2 pl-1">
                                   {["Embroidery Services", "Vector Services", "Embroidery Patches"].map((item, i) => (
                                        <label key={i} className="text-primary flex items-center gap-2 text-sm font-medium">
                                             <input type="checkbox" className="accent-btBlue" />
                                             {item}
                                        </label>
                                   ))}
                              </div>
                         )}
                    </div>
                    {/* Price Range */}
                    <div className="py-4">
                         <div className="flex cursor-pointer items-center justify-between" onClick={() => setShowPrice(!showPrice)}>
                              <p className="text-primary text-base font-semibold">Price Range</p>
                              {showPrice ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                         </div>
                         {showPrice && (
                              <div className="mt-4 pl-1">
                                   <div className="mb-1 flex items-center justify-between text-sm font-medium">
                                        <span>${priceRange[0]}</span>
                                        <span>${priceRange[1]}</span>
                                   </div>
                                   <input type="range" min="0" max="1000" step="10" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="accent-btBlue w-full" />
                              </div>
                         )}
                    </div>
                    {/* Tags */}
                    <div className="py-4">
                         <div className="flex cursor-pointer items-center justify-between" onClick={() => setShowTags(!showTags)}>
                              <p className="text-primary text-base font-semibold">Tags</p>
                              {showTags ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                         </div>
                         {showTags && (
                              <div className="mt-4 space-y-2 pl-1">
                                   {tags.map((tag, i) => (
                                        <label key={i} className="text-primary flex items-center gap-2 text-sm font-medium">
                                             <input type="checkbox" className="accent-btBlue" />
                                             {tag}
                                        </label>
                                   ))}
                              </div>
                         )}
                    </div>
               </div>
          </div>
     );
}
