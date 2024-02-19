import AddToFavBtn from "../add-to-fav-btn/add-to-fav-component";
import AddToCartBtn from "../add-to-cart-btn/add-to-cart-btn-component";
import DeleteFromCartBtn from "../delete-from-cart-btn/delete-from-cart-component";

const CartItem = ({ item, isCart }) => {
  return (
    <div className="mt-8 dark:bg-[#196774] rounded-lg p-5">
      <div className="grid grid-cols-2 gap-5">
        <figure className="flex flex-wrap gap-3">
          <div className="basis-[100%] md:basis-[60%]">
            <img
              src={item.image}
              alt={`${item.title} Image`}
              className="w-[100%]"
            />
          </div>
          <figcaption className="basis-[100%] md:basis-[35%]">
            {item.title}
          </figcaption>
        </figure>
        <div className="flex justify-between">
          <p className="font-bold">{`$${item.price}`}</p>
          <AddToFavBtn product={item} />
        </div>

        <div className="flex items-end">
          {isCart && <DeleteFromCartBtn product={item} />}
        </div>

        <AddToCartBtn product={item} />
      </div>
      <div className="divider dark:hidden"></div>
    </div>
  );
};

export default CartItem;
