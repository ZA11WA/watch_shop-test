"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { convertPrice } from "@/utils/convertPrice";

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="dark:bg-neutral-600  col-span-1 cursor-pointer  border-stone-100   shadow-sm rounded-3xl  bg-slate-50  p-2 transition hover:scale-105 mt-2"
    >
      <div className="overflow-x-hidden rounded-2xl relative">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            src={data.images[0].image}
            alt={data.name}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
      <div className="mt-4 pl-2 mb-2 flex flex-col">
        <div className="mb-2 md:mb-0">
          <p className="text-center text-sm font-semibold text-gray-900 dark:text-white mb-0">
            {data.name}
          </p>
          <p className="text-left text-sm text-gray-800 dark:text-white mt-1">
            {convertPrice(data.price)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
