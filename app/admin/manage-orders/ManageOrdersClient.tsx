"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading/Heading";
import Status from "@/app/components/Status";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdOutlinePayments,
  MdPayment,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import moment from "moment";
interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};
const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const router = useRouter();

  let rows: any = [];
  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount / 100),
        date: moment(order.createData).fromNow(),
        deliveryStatus: order.deliveryStatus,
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
      field: "customer",
      headerName: "Użytkownik",
      width: 130,
      renderCell: (params) => {
        return <div className="dark:text-white">{params.row.customer}</div>;
      },
    },
    {
      field: "amount",
      headerName: "Cena",
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
      headerName: "Status dostawy",
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
                text="dostarczone"
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
      headerName: "Akcje",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => {
                handleDispatch(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => {
                handleDeliver(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

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
    <div className="max-w-[1150px] mx-auto my-8 p-3 bg-white dark:bg-neutral-900 rounded-xl shadow-lg">
      <div className="mb-4 text-center text-gray-900 dark:text-white">
        <Heading title="Zamówienia" center />
      </div>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">ID</th>
              <th scope="col" className="py-3 px-6">Użytkownik</th>
              <th scope="col" className="py-3 px-6">Cena</th>
              <th scope="col" className="py-3 px-6">Status dostawy</th>
              <th scope="col" className="py-3 px-6">Data</th>
              <th scope="col" className="py-3 px-6">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}>
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
                      icon={MdDeliveryDining}
                      bg="bg-purple-200"
                      color="text-purple-700"
                    />
                  ) : order.deliveryStatus === "delivered" ? (
                    <Status
                      text="dostarczone"
                      icon={MdDone}
                      bg="bg-green-200"
                      color="text-green-700"
                    />
                  ) : (
                    <div className="dark:text-white">N/A</div>
                  )}
                </td>
                <td className="py-4 px-6">{moment(order.createData).fromNow()}</td>
                <td className="py-4 px-6">
                  <div className="flex justify-start items-center space-x-4">
                    <ActionBtn
                      icon={MdDeliveryDining}
                      onClick={() => handleDispatch(order.id)}
                    />
                    <ActionBtn
                      icon={MdDone}
                      onClick={() => handleDeliver(order.id)}
                    />
                    <ActionBtn
                      icon={MdRemoveRedEye}
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