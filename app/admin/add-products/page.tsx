import AddProductForm from "./AddProductForm";
import { getActiveUser } from "@/actions/getActiveUser";
import NullData from "@/app/components/NullData";

const AddProducts = async () => {
  const currentUser = await getActiveUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Brak dostępu" />;
  }
  return (
    <div className="p-8 dark:bg-neutral-800">
      <AddProductForm />
    </div>
  );
};

export default AddProducts;
