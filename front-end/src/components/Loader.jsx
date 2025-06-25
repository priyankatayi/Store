import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useSearchParams } from "react-router-dom";

export default function Loader({ text = "Payment in progress..." }) {
  const { navigate } = useAppContext();

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (orderId) {
      setTimeout(() => {
        navigate("/my-orders");
      }, 5000);
    }
  }, [orderId]);
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-base text-gray-600">{text}</p>
    </div>
  );
}
