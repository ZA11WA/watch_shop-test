// OrderDetails.tsx
"use client";

import Heading from "@/app/components/Heading/Heading";
import Status from "@/app/components/Status";

import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/router";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="flex flex-col gap-8 max-w-[1150px] m-auto">
      {/* OrderItem */}
      <div className="bg-white dark:bg-neutral-900 dark:text-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="font-semibold mt-4 mb-2">Products ordered</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUCT</div>
          <div className="justify-self-center">PRICE</div>
          <div className="justify-self-center">QTY</div>
          <div className="justify-self-end">TOTAL</div>
        </div>
        {order.products &&
          order.products.map((item) => {
            return <OrderItem key={item.id} item={item} />;
          })}
      </div>

      {/* OrderDetails */}
      <div className="w-full">
        <div className="mt-8 dark:text-white">
          <Heading title="Order Details" />
        </div>
        <div className="bg-white dark:bg-neutral-900 dark:text-white rounded-lg shadow-md p-8 mb-4">
          <div>Order ID: {order.id}</div>
          <div>
            Total Amount: <span className="font-bold">{formatPrice(order.amount)}</span>
          </div>
          <div className="flex gap-2 items-center">
            <div>Delivery status:</div>
            <div>
              {order.deliveryStatus === "pending" ? (
                <Status
                  text="pending"
                  icon={MdAccessTimeFilled}
                  bg="bg-slate-200"
                  color="text-slate-700"
                />
              ) : order.deliveryStatus === "dispatched" ? (
                <Status
                  text="dispatched"
                  icon={MdDeliveryDining}
                  bg="bg-purple-200"
                  color="text-purple-700"
                />
              ) : order.deliveryStatus === "delivered" ? (
                <Status
                  text="delivered"
                  icon={MdDone}
                  bg="bg-green-200"
                  color="text-green-700"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div>Payment status:</div>
            <div>
              {order.status === "pending" ? (
                <Status
                  text="pending"
                  icon={MdAccessTimeFilled}
                  bg="bg-slate-200"
                  color="text-slate-700"
                />
              ) : order.status === "complete" ? (
                <Status
                  text="completed"
                  icon={MdDone}
                  bg="bg-green-200"
                  color="text-green-700"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>Date: {moment(order.createData).fromNow()}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
