import { capitalize, truncate } from "lodash";
import { HiHeart } from "react-icons/hi2";
import AddToCartBtn from "../add-to-cart-btn/add-to-cart-btn-component";
import AddToFavBtn from "../add-to-fav-btn/add-to-fav-component";

const Card = ({ product }) => {
  const { price, title, image } = product;

  return (
    <div className="card p-2 bg-base-100 shadow-xl h-[30rem] dark:bg-[#196774] dark:text-white">
      <figure>
        <img src={image} alt={title} className="w-full" />
      </figure>
      <div className="card-body p-0">
        <div className="flex justify-end">
          <AddToFavBtn product={product} />
        </div>
        <h2 className="card-title text-inherit">
          {truncate(capitalize(title))}
        </h2>
        <div>
          <p>${price}</p>
        </div>
        <div className="card-actions">
          <AddToCartBtn product={product} />
        </div>
      </div>
    </div>
  );
};

export default Card;
