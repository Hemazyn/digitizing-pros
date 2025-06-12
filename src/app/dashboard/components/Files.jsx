import Image from "next/image";
import { Download } from "lucide-react";

export default function Files() {
  return (
    <div className="bg-cardBg3 border-btGray max-h-full w-full rounded-[10px] border">
      <div className="mx-auto flex w-[92%] flex-col space-y-4 py-5">
        <h3 className="text-primary text-sm font-semibold">My Files</h3>
        {/* section orders */}
        <div className="border-btGray flex items-center space-y-3 rounded-lg border px-2 py-2.5">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="bg-pointBg border-btGray flex place-content-center rounded-lg border p-1">
                <Image src="/ellipse.svg" width={25} height={25} alt="ellipse" />
              </div>
              <div className="flex flex-col justify-center gap-0.5">
                <h4 className="text-primary text-xs font-semibold">Logo-Final.jpeg</h4>
                <span className="text-xxs text-btext font-medium">2.4 MB · April 16, 2025</span>
              </div>
            </div>
            <Download size={14} alt="download" className="hover:text-btBlue text-primary mr-2 cursor-pointer" />
          </div>
        </div>
        {/* two */}
        <div className="border-btGray flex items-center space-y-3 rounded-lg border px-2 py-2.5">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="bg-pointBg border-btGray flex place-content-center rounded-lg border p-1">
                <Image src="/ellipse.svg" width={25} height={25} alt="ellipse" />
              </div>
              <div className="flex flex-col justify-center gap-0.5">
                <h4 className="text-primary text-xs font-semibold">Logo-Final.jpeg</h4>
                <span className="text-xxs text-btext font-medium">2.4 MB · April 16, 2025</span>
              </div>
            </div>
            <Download size={14} alt="download" className="hover:text-btBlue text-primary mr-2 cursor-pointer" />
          </div>
        </div>
        {/* three */}
        <div className="border-btGray flex items-center space-y-3 rounded-lg border px-2 py-2.5">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="bg-pointBg border-btGray flex place-content-center rounded-lg border p-1">
                <Image src="/ellipse.svg" width={25} height={25} alt="ellipse" />
              </div>
              <div className="flex flex-col justify-center gap-0.5">
                <h4 className="text-primary text-xs font-semibold">Logo-Final.jpeg</h4>
                <span className="text-xxs text-btext font-medium">2.4 MB · April 16, 2025</span>
              </div>
            </div>
            <Download size={14} alt="download" className="hover:text-btBlue text-primary mr-2 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
