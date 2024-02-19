import { useSelector } from "@xstate/react";
import { rootContext } from "../../RootContext";
import { HiShoppingCart } from "react-icons/hi2";

const CartIcon = () => {
  const machineRef = rootContext.useActorRef().system.get("cartIcon");
  const { cartCount } = useSelector(machineRef, (state) => state.context);
  return (
    <div className="indicator grid grid-cols-2">
      <span className="indicator-item badge badge-secondary bg-red-400">
        {cartCount}
      </span>
      <HiShoppingCart className="text-2xl" />
    </div>
  );
};

export default CartIcon;
