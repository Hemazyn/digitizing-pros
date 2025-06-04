import { Suspense } from "react";
import CartContent from "./component/CartContent";
import Loading from "./loading";

export default function CartPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CartContent />
    </Suspense>
  );
}
