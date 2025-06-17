"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Orders from "./Order";

export default function OrdersWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [successFlag, setSuccessFlag] = useState(false);
  const [cancelFlag, setCancelFlag] = useState(false);

  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");

    if (success === "true") {
      setSuccessFlag(true);
      const params = new URLSearchParams(window.location.search);
      params.delete("success");
      const cleanUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
      router.replace(cleanUrl, { scroll: false });
    }

    if (canceled === "true") {
      setCancelFlag(true);
      router.replace("/dashboard?tab=orders", { scroll: false });
    }
  }, [searchParams]);

  return <Orders successFlag={successFlag} cancelFlag={cancelFlag} />;
}
