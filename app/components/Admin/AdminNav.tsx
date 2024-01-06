"use client";
import Link from "next/link";
import Container from "../Container";
import AdminNavItem from "./AdminNavItem";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import { usePathname } from "next/navigation";
import { IoStatsChart } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RxDragHandleHorizontal } from "react-icons/rx";
import { RxDragHandleVertical } from "react-icons/rx";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../NullData";
import { useCallback, useState } from "react";
import { FaList } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import BackDrop from "../nav/BackDrop";

const AdminNav: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const menuClasses = isOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <div className="relative z-30">
      <div
        onClick={toggleOpen}
        className="p-2   flex items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700 dark:text-white"
      >
        <FaList size={25} />
        <AiFillCaretDown />
      </div>
      {isOpen && <BackDrop onClick={toggleOpen} />}
      <div
        className={`fixed top-0 left-0 h-full w-52 bg-white dark:bg-neutral-700 overflow-auto z-40 transition-transform duration-300 ${menuClasses}`}
      >
        <Link href="/admin">
          <AdminNavItem label="Statystyki" selected={pathname == "/admin"} />
        </Link>
        <Link href="/admin/add-products">
          <AdminNavItem
            label="Dodaj produkt"
            selected={pathname == "/admin/add-products"}
          />
        </Link>
        <Link href="/admin/manage-products">
          <AdminNavItem
            label="Zarządzaj produktem"
            selected={pathname == "/admin/manage-products"}
          />
        </Link>
        <Link href="/admin/manage-orders">
          <AdminNavItem
            label="Zarządzaj zamówieniem"
            selected={pathname == "/admin/manage-orders"}
          />
        </Link>
      </div>
    </div>
  );
};

export default AdminNav;
