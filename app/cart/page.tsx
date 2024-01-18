import { getCurrentUser } from "@/actions/getCurrentUser";
import CartClient from "./CartClient";

const Cart = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="">
      <CartClient currentUser={currentUser} />
    </div>
  );
};

export default Cart;
