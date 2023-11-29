import { Container } from "@mui/material";
import ProductDetails from "./ProductDetails";

import { products } from "@/utils/products";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";

interface IPrams {
  productId?: string;
}

const Product = async ({ params }: { params: IPrams }) => {
  const product = await getProductById(params);

  if (!product)
    return <NullData title="Oops! Products with the given id does not exist" />;

  return (
    <div className="p-2 ">
      <Container>
        <div className="mt-14 flex items-center justify-center ">
        <ProductDetails product={product} />

        </div>
      </Container>
    </div>
  );
};

export default Product;
