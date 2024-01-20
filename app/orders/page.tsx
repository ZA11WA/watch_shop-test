import { getActiveUser } from "@/actions/getActiveUser";
import NullData from "@/app/components/NullData";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import OrdersClient from "./OrdersClient";

const Orders = async () => {
  const currentUser = await getActiveUser();

  if (!currentUser) {
    return <NullData title="Brak dostępu!" />;
  }

  const orders = await getOrdersByUserId(currentUser.id);
  if (!orders) {
    return <NullData title="Brak zamówień" />;
  }

  return (
    <div className="pt-8 p-1">
      <OrdersClient orders={orders} />
    </div>
  );
};

export default Orders;
