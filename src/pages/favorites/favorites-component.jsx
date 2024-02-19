import { useSelector } from "@xstate/react";
import { rootContext } from "../../RootContext";
import CartItem from "../../components/cartItem/cart-item-component";

const Favorites = () => {
  const favActorRef = rootContext.useActorRef().system.get("favorites");
  const { favorites } = useSelector(favActorRef, (state) => state.context);

  if (favorites.length === 0) {
    return (
      <div className="text-center font-semibold">
        <p>Favorites is empty</p>
      </div>
    );
  }
  return (
    <div className="md:w-[75%]">
      {favorites.map((item) => (
        <CartItem key={item.id} item={item} isCart={false} />
      ))}
    </div>
  );
};

export default Favorites;
