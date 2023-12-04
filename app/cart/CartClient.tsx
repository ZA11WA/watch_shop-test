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
      <div className="flex flex-col items-center h-screen justify-center">
        <div className="text-2xl">Your cart is empty!</div>
        <div>
          <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-neutral-800 min-h-screen py-8 dark:text-white">
      <div className="container mx-auto px-4">
        <Heading title="Koszyk" center />

        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-6 mb-4">
              
                
                
                  {cartProducts.map((item) => (
                    <ItemContent key={item.id} item={item} />
                  ))}
                
              
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotalAmount)}</span>
              </div>
              
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold ">Order total</span>
                <span className="font-semibold">{formatPrice(cartTotalAmount)}</span>
              </div>
              <Button
                label={currentUser ? 'Zapłać' : 'Zaloguj się'}
                outline={!currentUser}
                onClick={() => {
                  currentUser ? router.push('/checkout') : router.push('/login');
                }}
              />
              <Link href={'/'} className="text-green-500 flex items-center gap-1 mt-4">
                <MdArrowBack />
                <span>Kontynuuj zakupy</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
