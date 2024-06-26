"use client";

import Button from "@/app/components/Button/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { convertPrice } from "@/utils/convertPrice";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[100%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  const router = useRouter();

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cartProduct]);

  const theme = useTheme();
  return (
    <div className="min-h-screen">
      <div className=" border-[1.5px] border-stone-300  px-2 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductImage
          cartProduct={cartProduct}
          product={product}
          handleColorSelect={handleColorSelect}
        />
        <div className="flex flex-col gap-1 text-gray-500 dark:text-white text-sm p-2">
          <h2 className=" text-4xl font-medium text-gray-700 dark:text-white">
            {product.name}
          </h2>

          <Horizontal />
          <div className="text-justify text-base">{product.description}</div>
          <Horizontal />
          <div className="text-lg">
            <span className="font-semibold">KATEGORIA:</span> {product.category}
          </div>
          <div className="text-lg">
            <span className="font-semibold">FIRMA:</span> {product.brand}
          </div>
          <div className={product.inStock ? "text-green-400" : "text-red-600"}>
            {product.inStock
              ? "Dostępny"
              : "Niedostępny - Produkt zakupiony zostanie zarezerwowany i wysłany w ciągu 1 miesiąca."}
          </div>
          <Horizontal />
          {isProductInCart ? (
            <div className="">
              <p className="mb-2 text-slate-500 dark:text-white flex items-center gap-1">
                <MdCheckCircle className="text-green-400" size={20} />
                <span>Produkt dodany do karty</span>
              </p>
              <div className="max-w-[300px] ">
                <Button
                  label="Wyświetl koszyk"
                  outline
                  onClick={() => {
                    router.push("/cart");
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              <SetQuantity
                cartProduct={cartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
              />
              <Horizontal />
              <div className="text-lg">
                <span className="font-semibold">CENA:</span>{" "}
                {convertPrice(product.price)}
              </div>
              <Horizontal />
              <div className="max-w-[300px]">
                <Button
                  label="Dodaj do koszyka"
                  onClick={() => handleAddProductToCart(cartProduct)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
