'use client'
import React, { useCallback, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import Link from 'next/link';
import MenuItem from './MenuItem';
import BackDrop from './BackDrop';
import { categories } from '@/utils/Categories';
import { FaList } from "react-icons/fa";
const CategoriesMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Dodaj klasy Tailwind do kontrolowania pozycji i widoczności menu
  const menuClasses = isOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="p-2   flex items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700 dark:text-white"
        >
            
          <FaList size={25}/>
          <AiFillCaretDown />
        </div>
      </div>
      {isOpen && <BackDrop onClick={toggleOpen} />}
      <div
        className={`fixed top-0 left-0 h-full w-52 bg-white dark:bg-neutral-700 overflow-auto z-40 transition-transform duration-300 ${menuClasses}`}
      >
        {categories.map((item) => (
          <Link href={`/?category=${item.label}`} key={item.label}>
            <MenuItem onClick={toggleOpen}>{item.label}</MenuItem>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CategoriesMenu;
