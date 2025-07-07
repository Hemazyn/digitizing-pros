import { Loader } from "lucide-react";
export default function Loading() {
  return (
    <div className="bg-svg p8 pt16 flex h-screen flex-col items-center justify-center">
      <Loader size={40} className="text-btBlue animate-spin" />
    </div>
  );
}
//  {
//    loading && (
//      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//        <Loader size={40} className="text-btBlue animate-spin" />
//      </div>
//    );
//  }
