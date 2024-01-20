import ManageProductsForm from "./ManageProductsForm";
import getProducts from "@/actions/getProducts";
import { getActiveUser } from "@/actions/getActiveUser";
import NullData from "@/app/components/NullData";

const ManageProducts = async () => {
  const products = await getProducts({ category: null });
  const activeUser = await getActiveUser();

  if (!activeUser || activeUser.role !== "ADMIN") {
    return <NullData title="Brak dostępu" />;
  }
  return (
    <div className="pt-8">
      <ManageProductsForm products={products} />
    </div>
  );
};

export default ManageProducts;
