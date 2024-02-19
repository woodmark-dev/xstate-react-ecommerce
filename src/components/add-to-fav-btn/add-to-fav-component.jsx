import { useEffect } from "react";
import { useSelector } from "@xstate/react";
import HeartSvg from "../heart-svg/heart-svg-component";

const AddToFavBtn = ({ product }) => {
  const { addToFavBtnRef } = product;
  const state = useSelector(addToFavBtnRef, (state) => state.value);

  useEffect(() => {
    addToFavBtnRef.send({ type: "SYNC", productId: product.id });
  }, [addToFavBtnRef, product.id]);

  const handleClick = (e) => {
    e.preventDefault();
    addToFavBtnRef.send({ type: "ADD_OR_REMOVE_FAVORITE", product });
  };

  return (
    <div>
      <button className="bg-inherit" onClick={handleClick}>
        <HeartSvg state={state} />
      </button>
    </div>
  );
};

export default AddToFavBtn;
