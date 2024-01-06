'use client'
import React, { useCallback, useState } from 'react';
import { usePathname, useSearchParams } from "next/navigation";
import Container from "../Container";
import Category from "./Category";
import { categories } from "@/utils/Categories";
import BackDrop from './BackDrop';
import { AiFillCaretDown } from 'react-icons/ai';
import { FaList } from 'react-icons/fa';

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleCategorySelect = useCallback(() => {
    setIsOpen(false);
  }, []);

  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  const menuClasses = isOpen ? "translate-x-0" : "-translate-x-full";

  if (!isMainPage) return null;

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="p-2 flex items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700 dark:text-white"
        >
          <FaList size={25}/>
          <AiFillCaretDown/>
        </div>
      </div>
      {isOpen && <BackDrop onClick={toggleOpen} />}
      <div
        className={`fixed top-0 left-0 h-full w-52 bg-white dark:bg-neutral-700 overflow-auto z-40 transition-transform duration-300 ${menuClasses}`}
      >
        <Container>
          <div className="flex flex-col gap-1">
            {categories.map((item) => (
              <div key={item.label} onClick={handleCategorySelect}> {/* Add unique key here */}
                <Category
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  selected={category === item.label || (category === null && item.label === "Wszystkie")}
                />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Categories;
