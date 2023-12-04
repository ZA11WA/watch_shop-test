import Container from "@/app/components/Container";


import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import OrdersClient from "./OrdersClient";

const Orders = async () => {

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <NullData title="Oops! Access denied" />;
  }

  const orders = await getOrdersByUserId(currentUser.id)
  if (!orders) {
    return <NullData title="Oops! No orders yet..." />;
  }

  return (
    <div className="pt-8 p-1">
      
        <OrdersClient orders = {orders} />
      
    </div>
  );
};

export default Orders;
