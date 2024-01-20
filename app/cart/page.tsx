import { getActiveUser } from "@/actions/getActiveUser";
import CartClient from "./CartClient";

const Cart = async () => {
  const activeUser = await getActiveUser();
  return (
    <div className="">
      <CartClient activeUser={activeUser} />
    </div>
  );
};

export default Cart;
