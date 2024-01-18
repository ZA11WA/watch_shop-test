import ProductDetails from "./ProductDetails";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";

interface IPrams {
  productId?: string;
}

const Product = async ({ params }: { params: IPrams }) => {
  const product = await getProductById(params);

  if (!product) return <NullData title="Produkt z tym ID nie istnieje!" />;

  return (
    <div className="max-w-[1920px] mx-auto xl:px-20 md:px-2 px02">
      <div className="p-2 mt-14 flex justify-center items-center">
        <ProductDetails product={product} />
      </div>
    </div>
  );
};

export default Product;
