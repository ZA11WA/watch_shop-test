import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

interface IPrams {
  orderId?: string;
}

const Order = async ({ params }: { params: IPrams }) => {
  const order = await getOrderById(params);

  if (!order) return <NullData title="Brak zamówienia"></NullData>;
  return (
    <div className="p-2">
      <OrderDetails order={order} />
    </div>
  );
};

export default Order;
