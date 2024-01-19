"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading/Heading";
import Status from "@/app/components/Status";
import {
  MdAccessTimeFilled,
 
  MdDone,
  MdOutlinePayments,
  MdPayment,
  MdRemoveRedEye,
} from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import moment from "moment";
import { IoSearchOutline } from "react-icons/io5";
interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};
const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const router = useRouter();

  const handleDispatch = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        deliveryStatus: "dispatched",
      })
      .then((res) => {
        toast.success("Zamówienie w drodze.");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Ups! Coś poszło nie tak");
        console.log(err);
      });
  }, []);
  const handleDeliver = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        deliveryStatus: "delivered",
      })
      .then((res) => {
        toast.success("Zamówienie dostarczone.");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Ups! Coś poszło nie tak.");
        console.log(err);
      });
  }, []);

  return (
    <div className="max-w-[1150px] mx-auto my-8 p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg">
    <div className="mb-4 text-center text-black dark:text-white">
        <Heading title="Zamówienia" center />
      </div>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-black dark:text-white">
          <thead className="text-xs text-black uppercase bg-neutral-50 dark:bg-neutral-500  dark:text-white">
            <tr>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                Użytkownik
              </th>
              <th scope="col" className="py-3 px-6">
                Cena
              </th>
              <th scope="col" className="py-3 px-6">
                Status dostawy
              </th>
              <th scope="col" className="py-3 px-6">
                Data
              </th>
              <th scope="col" className="py-3 px-6">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`${
                  index % 2 === 0
                  ? "bg-white dark:bg-neutral-800"
                  : "bg-neutral-50 dark:bg-neutral-900"
                }`}
              >
                <td className="py-4 px-6">{order.id}</td>
                <td className="py-4 px-6">{order.user.name}</td>
                <td className="py-4 px-6">{formatPrice(order.amount / 100)}</td>
                <td className="py-4 px-6">
                  {order.deliveryStatus === "pending" ? (
                    <Status
                      text="oczekuje"
                      icon={MdAccessTimeFilled}
                      bg="bg-slate-200"
                      color="text-slate-700"
                    />
                  ) : order.deliveryStatus === "dispatched" ? (
                    <Status
                      text="w drodze"
                      icon={TbTruckDelivery}
                      bg="bg-yellow-200"
                      color="text-yellow-700"
                    />
                  ) : order.deliveryStatus === "delivered" ? (
                    <Status
                      text="dostarczone"
                      icon={MdDone}
                      bg="bg-green-300"
                      color="text-green-700"
                    />
                  ) : (
                    <div className="dark:text-white">N/A</div>
                  )}
                </td>
                <td className="py-4 px-6">
                  {moment(order.createData).fromNow()}
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-start items-center space-x-4">
                    <ActionBtn
                      icon={TbTruckDelivery}
                      onClick={() => handleDispatch(order.id)}
                    />
                    <ActionBtn
                      icon={MdDone}
                      onClick={() => handleDeliver(order.id)}
                    />
                    <ActionBtn
                      icon={IoSearchOutline}
                      onClick={() => router.push(`/order/${order.id}`)}
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

export default ManageOrdersClient;
