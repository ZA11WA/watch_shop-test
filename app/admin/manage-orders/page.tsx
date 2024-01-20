import ManageOrdersForm from "./ManageOrdersForm";

import { getActiveUser } from "@/actions/getActiveUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";

const ManageOrders = async () => {
  const orders = await getOrders();
  const activeUser = await getActiveUser();

  if (!activeUser || activeUser.role !== "ADMIN") {
    return <NullData title="Brak dostępu" />;
  }
  return (
    <div className="pt-8">
      <ManageOrdersForm orders={orders} />
    </div>
  );
};

export default ManageOrders;
