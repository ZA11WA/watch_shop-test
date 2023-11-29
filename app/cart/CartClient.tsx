"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading/Heading";
import Button from "../components/Button/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps {
  currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty!</div>
        <div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto mt-8 p-1">
      <Heading title="Koszyk" center />

      <div className="grid grid-cols-5 text-sm gap-4 pb-2 items-center bg-stone-300 p-4 rounded-t-md">
        <div className="col-span-2 justify-self-start">PRODUKT</div>
        <div className="justify-self-center">CENA</div>
        <div className="justify-self-center">ILOŚĆ</div>
        <div className="justify-self-end">SUMA</div>
      </div>

      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>

      <div className="border-t-[1.5px] border-gray-300 py-4 flex justify-between gap-4">
        <div className="w-[90px]">
          <Button
            small
            outline
            label="Clear Cart"
            onClick={() => {
              handleClearCart();
            }}
          />
        </div>

        <div className="text-sm flex flex-col gap-3 items-start">
          <div className="flex justify-between w-full text-base font-semibold gap-1">
            <span>Suma całkowita:</span>
            <span className="text-lg text-gray-600">{formatPrice(cartTotalAmount)}</span>
          </div>

          

          <Button
            label={currentUser ? 'Zapłać' : 'Zaloguj się'}
            outline={currentUser ? false : true}
            onClick={() => {
              currentUser ? router.push('/checkout') : router.push('/login');
            }}
          />

          <Link href={'/'} className="text-green-500 flex items-center gap-1">
            <MdArrowBack />
            <span>Kontynuuj zakupy</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;