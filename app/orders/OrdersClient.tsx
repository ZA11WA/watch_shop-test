"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading/Heading";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import { BsEyeglasses } from "react-icons/bs";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
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
    { field: "customer", 
    headerName: "Użytkownik", 
    width: 130,
  renderCell: (params) => {
    return(
      <div className="dark:text-white">
        {params.row.customer}
      </div>
    )
  } },
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
      field: "paymentStatus",
      headerName: "Status płatności",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.paymentStatus === "pending" ? (
              <Status
                text="oczekuje"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.paymentStatus === "complete" ? (
              <Status
                text="zakończony"
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
        return(
          <div className="dark:text-white">
            {params.row.date}
          </div>
        )
      }
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
      <div style={{ height: 600, width: '100%' }} className="overflow-auto">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          className="bg-white dark:bg-neutral-600"
          getRowClassName={(params) => 
            `my-2 rounded-lg ${params.indexRelativeToCurrentPage % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-900' : 'bg-white dark:bg-neutral-800'}`
          }
        />
      </div>
    </div>
  );
};

export default OrdersClient;
