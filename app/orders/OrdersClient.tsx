"use client";

import { Order, User } from "@prisma/client";
import { GridColDef } from "@mui/x-data-grid";
import { convertPrice } from "@/utils/convertPrice";
import Heading from "@/app/components/Heading/Heading";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";

import ActionBtn from "@/app/components/ActionBtn";
import { useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";

import moment from "moment";
import { TbTruckDelivery } from "react-icons/tb";
interface OrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};
const OrdersClient: React.FC<OrdersClientProps> = ({ orders }) => {
  const router = useRouter();

  return (
    <div className="max-w-[1150px] mx-auto my-8 p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg">
      <div className="mb-4 text-center text-black dark:text-white">
        <Heading title="Zamówienia" center />
      </div>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-black dark:text-white">
          <thead className="text-xs text-black uppercase bg-neutral-50 dark:bg-neutral-500  dark:text-white">
            <tr>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Użytkownik</th>
              <th className="py-3 px-6">Kwota</th>
              <th className="py-3 px-6">Status przesyłki</th>
              <th className="py-3 px-6">Data</th>
              <th className="py-3 px-6">Podgląd zamówienia</th>
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
                <td className="py-4 px-6">{convertPrice(order.amount / 100)}</td>
                <td className="py-4 px-6">
                  <Status
                    text={
                      order.deliveryStatus === "pending"
                        ? "oczekuje"
                        : order.deliveryStatus === "dispatched"
                        ? "w drodze"
                        : "dostarczono"
                    }
                    icon={
                      order.deliveryStatus === "pending"
                        ? MdAccessTimeFilled
                        : order.deliveryStatus === "dispatched"
                        ? TbTruckDelivery
                        : MdDone
                    }
                    bg={
                      order.deliveryStatus === "pending"
                        ? "bg-slate-200"
                        : order.deliveryStatus === "dispatched"
                        ? "bg-yellow-200"
                        : "bg-green-300"
                    }
                    color={
                      order.deliveryStatus === "pending"
                        ? "text-slate-700"
                        : order.deliveryStatus === "dispatched"
                        ? "text-yellow-700"
                        : "text-green-700"
                    }
                  />
                </td>
                <td className="py-4 px-6">
                  {moment(order.createData).fromNow()}
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-center">
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

export default OrdersClient;
