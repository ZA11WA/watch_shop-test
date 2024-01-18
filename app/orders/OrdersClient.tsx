"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading/Heading";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import { BsEyeglasses } from "react-icons/bs";
import ActionBtn from "@/app/components/ActionBtn";
import { useRouter } from "next/navigation";

import moment from "moment";
interface OrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};
const OrdersClient: React.FC<OrdersClientProps> = ({ orders }) => {
  const router = useRouter();

  let rows: any = [];
  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createData).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };
    });
  }

  const columns: GridColDef[] = [
    {
      field: "customer",
      headerName: "Użytkownik",
      width: 130,
      renderCell: (params) => {
        return <div className="dark:text-white">{params.row.customer}</div>;
      },
    },
    {
      field: "amount",
      headerName: "Kwota",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800 dark:text-white">
            {params.row.amount}
          </div>
        );
      },
    },

    {
      field: "deliveryStatus",
      headerName: "Status przesyłki",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="oczekuje"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status
                text="w drodze"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
              <Status
                text="dostarczono"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Data",
      width: 130,
      renderCell: (params) => {
        return <div className="dark:text-white">{params.row.date}</div>;
      },
    },
    {
      field: "action",
      headerName: "Podgląd zamówienia",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              icon={BsEyeglasses}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-[1150px] mx-auto my-8 p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg">
      <div className="mb-4 text-center text-gray-900 dark:text-white">
        <Heading title="Zamówienia" center />
      </div>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              <tr key={order.id} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}>
                <td className="py-4 px-6">{order.id}</td>
                <td className="py-4 px-6">{order.user.name}</td>
                <td className="py-4 px-6">{formatPrice(order.amount / 100)}</td>
                <td className="py-4 px-6">
                  <Status
                    text={order.deliveryStatus === "pending" ? "oczekuje" : order.deliveryStatus === "dispatched" ? "w drodze" : "dostarczono"}
                    icon={order.deliveryStatus === "pending" ? MdAccessTimeFilled : order.deliveryStatus === "dispatched" ? MdDeliveryDining : MdDone}
                    bg={order.deliveryStatus === "pending" ? "bg-slate-200" : order.deliveryStatus === "dispatched" ? "bg-purple-200" : "bg-green-200"}
                    color={order.deliveryStatus === "pending" ? "text-slate-700" : order.deliveryStatus === "dispatched" ? "text-purple-700" : "text-green-700"}
                  />
                </td>
                <td className="py-4 px-6">{moment(order.createData).fromNow()}</td>
                <td className="py-4 px-6">
                  <div className="flex justify-center">
                    <ActionBtn
                      icon={BsEyeglasses}
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
