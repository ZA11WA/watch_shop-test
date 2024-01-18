"use client";

import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading/Heading";
import Status from "@/app/components/Status";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
interface ManageProductsClientProps {
  products: Product[];
}
const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);
  let rows: any = [];
  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 220,
      renderCell: (params) => {
        return <div className="dark:text-white">{params.row.id}</div>;
      },
    },
    {
      field: "name",
      headerName: "Nazwa",
      width: 220,
      renderCell: (params) => {
        return <div className="dark:text-white">{params.row.name}</div>;
      },
    },
    {
      field: "price",
      headerName: "Cena",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800 dark:text-white">
            {params.row.price}
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Kategoria",
      width: 100,
      renderCell: (params) => {
        return <div className="dark:text-white">{params.row.category}</div>;
      },
    },
    {
      field: "brand",
      headerName: "Firma",
      width: 100,
      renderCell: (params) => {
        return <div className="dark:text-white">{params.row.brand}</div>;
      },
    },
    {
      field: "inStock",
      headerName: "Dostępność",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.inStock === true ? (
              <Status
                text="Dostępny"
                icon={MdDone}
                bg="bg-teal-200"
                color="text-teal-700"
              />
            ) : (
              <Status
                text="Niedostępny"
                icon={MdClose}
                bg="bg-rose-200"
                color="text-rose-700"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Akcje",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdCached}
              onClick={() => {
                handleToggleStock(params.row.id, params.row.inStock);
              }}
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => {
                handleDelete(params.row.id, params.row.iamges);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`product/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleToggleStock = useCallback((id: string, inStock: boolean) => {
    axios
      .put("/api/product", {
        id,
        inStock: !inStock,
      })
      .then((res) => {
        toast.success("Zmiana statusu produktu.");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Ups! Coś poszło nie tak.");
        console.log(err);
      });
  }, []);

  const handleDelete = useCallback(async (id: string, images: any[]) => {
    toast("Usuwanie produktu, poczekaj...");

    const handleImageDelete = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.image);
            await deleteObject(imageRef);
            console.log("image deleted", item.image);
          }
        }
      } catch (error) {
        return console.log("Deleting images error", error);
      }
    };

    await handleImageDelete();

    axios
      .delete(`/api/product/${id}`)
      .then((res) => {
        toast.success("Produkt usunięty");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Błąd podczas usuwania produktu.");
        console.log(err);
      });
  }, []);

  return (
    <div className="max-w-[1150px] mx-auto my-8 p-3 bg-white dark:bg-neutral-900 rounded-xl shadow-lg">
      <div className="mb-4 text-center text-gray-900 dark:text-white">
        <Heading title="Zarządzanie produktami" center />
      </div>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">ID</th>
              <th scope="col" className="py-3 px-6">Nazwa</th>
              <th scope="col" className="py-3 px-6">Cena</th>
              <th scope="col" className="py-3 px-6">Kategoria</th>
              <th scope="col" className="py-3 px-6">Firma</th>
              <th scope="col" className="py-3 px-6">Dostępność</th>
              <th scope="col" className="py-3 px-6">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}>
                <td className="py-4 px-6">{product.id}</td>
                <td className="py-4 px-6">{product.name}</td>
                <td className="py-4 px-6">{formatPrice(product.price)}</td>
                <td className="py-4 px-6">{product.category}</td>
                <td className="py-4 px-6">{product.brand}</td>
                <td className="py-4 px-6">
                  <Status
                    text={product.inStock ? "Dostępny" : "Niedostępny"}
                    icon={product.inStock ? MdDone : MdClose}
                    bg={product.inStock ? "bg-teal-200" : "bg-rose-200"}
                    color={product.inStock ? "text-teal-700" : "text-rose-700"}
                  />
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-start items-center space-x-4">
                    <ActionBtn
                      icon={MdCached}
                      onClick={() => handleToggleStock(product.id, product.inStock)}
                    />
                    <ActionBtn
                      icon={MdRemoveRedEye}
                      onClick={() => router.push(`/product/${product.id}`)}
                    />
                    <ActionBtn
                      icon={MdDelete}
                      onClick={() => handleDelete(product.id, product.images)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProductsClient;