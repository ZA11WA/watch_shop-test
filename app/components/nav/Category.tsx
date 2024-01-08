"use client";
import { ImageType } from "@/app/admin/add-products/AddProductForm";
import { Console } from "console";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({ label, icon: Icon, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (label == "Wszystkie") {
      router.push("/");
    } else {
      let currentQuery = {};
      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      };

      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );
      router.push(url);
    }
  }, [label, params, router]);
  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-gray-700 dark:text-white transition cursor-pointer
        ${
          selected
            ? "border-b-stone-800 text-black"
            : "border-transparent text-neutral-600"
        }
        `}
    >
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default Category;
