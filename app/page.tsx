export const revalidate = 0;

import HomeBanner from "./components/HomeBanner/HomeBanner";
import Container from "./components/Container";
import { products } from "@/utils/products";
import { truncateText } from "@/utils/truncateText";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";
import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

interface HomeProps {
  searchParams: IProductParams;
}
export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);



  if (products.length === 0) {
    return <NullData title="Ups! Nie znaleziono produktów" />;
  }
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      if (i % 2 === 0) {
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    return array;
  }
  const shuffledProducts = shuffleArray(products);

  return (
    <div className=" min-h-screen">
      
        <div className="ml-2 mr-2">
          <HomeBanner />
        </div>
        <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffledProducts.map((product: any) => {
            return <ProductCard data={product} key={product.id}  />;
          })}
        </div>
      
    </div>
  );
}
