"use client";
import Link from "next/link";
import Container from "../Container";
import AdminNavItem from "./AdminNavItem";
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md";
import { usePathname } from "next/navigation";
import { IoStatsChart } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RxDragHandleHorizontal } from "react-icons/rx";
import { RxDragHandleVertical } from "react-icons/rx";


const AdminNav = () => {
  const pathname = usePathname();

  return (
    <div className="w-full shadow-sm top-20 border border-b-[1px] pt-4 dark:bg-neutral-800 dark:border-neutral-700">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href="/admin">
            <AdminNavItem
              label="Statystyki"
              icon={IoStatsChart}
              selected={pathname == "/admin"}
            />
          </Link>
          <Link href="/admin/add-products">
            <AdminNavItem
              label="Dodaj produkt"
              icon={IoMdAdd}
              selected={pathname == "/admin/add-products"}
            />
          </Link>
          <Link href="/admin/manage-products">
            <AdminNavItem
              label="Zarządzaj produktem"
              icon={RxDragHandleHorizontal}
              selected={pathname == "/admin/manage-products"}
            />
          </Link>
          <Link href="/admin/manage-orders">
            <AdminNavItem
              label="Zarządzaj zamówieniem"
              icon={RxDragHandleVertical}
              selected={pathname == "/admin/manage-orders"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
