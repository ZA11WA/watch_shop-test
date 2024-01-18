import ManageOrdersClient from "./ManageOrdersClient";

import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";

const ManageOrders = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Brak dostępu" />;
  }
  return (
    <div className="pt-8">
      <ManageOrdersClient orders={orders} />
    </div>
  );
};

export default ManageOrders;
