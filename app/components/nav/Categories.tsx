'use client'
import { categories } from "@/utils/Categories";
import Container from "../Container";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) return null;
  return (
    <div className="bg-white dark:bg-neutral-800">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          {categories.map((item) => (
            <Category
              key={item.label}
              label={item.label}
              icon={item.icon}
              
              selected={
                category === item.label ||
                (category === null && item.label === "Wszystkie")
              }
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
