import { useSelector } from "@xstate/react";
import { rootContext } from "../../RootContext";
import Checkout from "../../components/checkout/checkout-component";
import CartItem from "../../components/cartItem/cart-item-component";

const Cart = () => {
  const cartActorRef = rootContext.useActorRef().system.get("cart");
  const cart = useSelector(cartActorRef, (state) => state.context.cart);

  if (cart.length === 0) {
    return (
      <div className="text-center font-semibold">
        <p>Cart is empty</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap flex-row md:gap-[5%] gap-10 justify-center md:justify-start">
      <div className="md:basis-[70%] basis-[90%]">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} isCart={true} />
        ))}
      </div>
      <div className="md:basis-[25%] basis-[90%]">
        <Checkout />
      </div>
    </div>
  );
};

export default Cart;
