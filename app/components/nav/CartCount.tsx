"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { RiShoppingBasket2Line } from "react-icons/ri";

const CartCount = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push("/cart")}
    >
      <div className="text-3xl">
      <RiShoppingBasket2Line />
      </div>
      <span className="absolute top-[-10px] right-[-10px] bg-gray-700 dark:bg-white dark:text-black text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">
        {cartTotalQty}
      </span>
    </div>
  );
};

export default CartCount;
