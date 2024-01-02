'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import Container from "../Container";
import Category from "./Category";
import { categories } from "@/utils/Categories";

const Categories = () => {
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  useEffect(() => {
    // Wyświetl kategorie tylko na głównej stronie
    setIsCategoriesVisible(isMainPage);
  }, [pathname]); // Reaguje na zmianę ścieżki

  if (!isCategoriesVisible) return null;

  return (
    <div className="bg-white dark:bg-neutral-800">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          {categories.map((item) => (
            <Category
              key={item.label}
              label={item.label}
              icon={item.icon}
              // Inne właściwości
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;

