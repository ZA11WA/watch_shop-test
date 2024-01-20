"use client";

import Heading from "@/app/components/Heading/Heading";
import Status from "@/app/components/Status";
import { convertPrice } from "@/utils/convertPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="flex flex-col gap-8 max-w-[1150px] m-auto">
      <div className="bg-white dark:bg-neutral-900 dark:text-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="font-semibold mt-4 mb-2">Zamówione produkty:</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUKT</div>
          <div className="justify-self-center">CENA</div>
          <div className="justify-self-center">ILOŚĆ</div>
          <div className="justify-self-end">RAZEM</div>
        </div>
        {order.products &&
          order.products.map((item) => {
            return <OrderItem key={item.id} item={item} />;
          })}
      </div>
      <div className="w-full">
        <div className="mt-8 dark:text-white">
          <Heading title="Order Details" />
        </div>
        <div className="bg-white dark:bg-neutral-900 dark:text-white rounded-lg shadow-md p-8 mb-4">
          <div>ID zamówienia: {order.id}</div>
          <div>
            Kwota całkowita:{" "}
            <span className="font-bold">{convertPrice(order.amount / 100)}</span>
          </div>

          <div className="flex gap-2 items-center">
            <div>Status zamówienia:</div>
            <div>
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
                  text="dostarczono"
                  icon={MdDone}
                  bg="bg-green-200"
                  color="text-green-700"
                />
              ) : (
                <></>
              )}
            </div>
          </div>

          <div>Data: {moment(order.createData).fromNow()}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
