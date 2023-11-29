"use client";

import {
  CartProductType,
  SelectedImgType,
} from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="grid  gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="col-span-5 relative  aspect-square">
        <Image
          fill
          className=" w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px] rounded-3xl"
          src={cartProduct.selectedImg.image}
          alt={cartProduct.name}
        />
      </div>
    </div>
  );
};

export default ProductImage;
