"use client";

import { Product } from "@prisma/client";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading/Heading";
import Status from "@/app/components/Status";
import { MdCached, MdClose, MdDelete, MdDone } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import { IoSearchOutline } from "react-icons/io5";
interface ManageProductsClientProps {
  products: Product[];
}
const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);

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
    <div className="max-w-[1150px] mx-auto my-8 p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg">
      <div className="mb-4 text-center text-black dark:text-white">
        <Heading title="Zarządzanie produktami" center />
      </div>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-black dark:text-white">
          <thead className="text-xs text-black uppercase bg-neutral-50 dark:bg-neutral-500  dark:text-white">
            <tr>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                Nazwa
              </th>
              <th scope="col" className="py-3 px-6">
                Cena
              </th>
              <th scope="col" className="py-3 px-6">
                Kategoria
              </th>
              <th scope="col" className="py-3 px-6">
                Firma
              </th>
              <th scope="col" className="py-3 px-6">
                Dostępność
              </th>
              <th scope="col" className="py-3 px-6">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-neutral-800"
                    : "bg-neutral-50 dark:bg-neutral-900"
                }`}
              >
                <td className="py-4 px-6">{product.id}</td>
                <td className="py-4 px-6">{product.name}</td>
                <td className="py-4 px-6">{formatPrice(product.price)}</td>
                <td className="py-4 px-6">{product.category}</td>
                <td className="py-4 px-6">{product.brand}</td>
                <td className="py-4 px-6">
                  <Status
                    text={product.inStock ? "Dostępny" : "Niedostępny"}
                    icon={product.inStock ? MdDone : MdClose}
                    bg={product.inStock ? "bg-green-300" : "bg-rose-300"}
                    color={product.inStock ? "text-green-700" : "text-red-700"}
                  />
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-start items-center space-x-4">
                    <ActionBtn
                      icon={MdCached}
                      onClick={() =>
                        handleToggleStock(product.id, product.inStock)
                      }
                    />
                    <ActionBtn
                      icon={IoSearchOutline}
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
