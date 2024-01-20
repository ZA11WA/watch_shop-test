import getProducts from "@/actions/getProducts";
import Summary from "./Summary";
import getOrders from "@/actions/getOrders";
import getUsers from "@/actions/getUsers";
import { getActiveUser } from "@/actions/getActiveUser";
import NullData from "../components/NullData";

const Admin = async () => {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();
  const currentUser = await getActiveUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Brak dostępu" />;
  }
  return (
    <div className="pt-8">
      <Summary products={products} orders={orders} users={users} />
    </div>
  );
};

export default Admin;
