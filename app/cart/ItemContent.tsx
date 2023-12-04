'use client'
import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { MdDelete } from "react-icons/md";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const { handleRemoveProductFromCard, handleCartQtyIncrease, handleCartQtyDecrease } = useCart();

  return (
    <div className=" grid grid-cols-3 md:grid-cols-5 text-sm md:text-base gap-4 border-t-2 border-gray-300 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-4 items-center">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-20 h-20">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`} className="text-gray-800 dark:text-white font-semibold">
            {item.name}
          </Link>
          <div className="text-gray-600 dark:text-white">{item.selectedImg.color}</div>
          <button
            onClick={() => handleRemoveProductFromCard(item)}
            className="text-gray-500 underline focus:outline-none dark:text-white"
          >
            <MdDelete size={25} />
          </button>
        </div>
      </div>
      <div className="justify-self-center dark:text-white">{formatPrice(item.price)}</div>
      <div className="justify-self-center dark:text-white">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyIncrease={() => handleCartQtyIncrease(item)}
          handleQtyDecrease={() => handleCartQtyDecrease(item)}
        />
      </div>
      <div className="justify-self-end font-semibold dark:text-white">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
