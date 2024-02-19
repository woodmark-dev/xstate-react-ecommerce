import { useSelector } from "@xstate/react";
import { useEffect } from "react";

const AddToCartBtn = ({ product: { btnMachineRef, ...product } }) => {
  const {
    value,
    context: { productCount },
  } = useSelector(btnMachineRef, (state) => state);

  useEffect(() => {
    btnMachineRef.send({ type: "SYNC_COUNT", productId: product.id });
  }, [btnMachineRef, product.id]);

  const addToCart = (e) => {
    e.preventDefault();
    btnMachineRef.send({ type: "ADD_PRODUCT_COUNT", product });
  };

  const reduceFromCart = (e) => {
    e.preventDefault();
    btnMachineRef.send({ type: "REDUCE_PRODUCT_COUNT", product });
  };

  if (value === "active") {
    return (
      <div className="flex w-full items-center justify-between">
        <button
          className="btn btn-circle  bg-[#EF6024] border-[#EF6024] hover:bg-[#EF6024] hover:border-[#EF6024] text-white"
          onClick={addToCart}
        >
          +
        </button>
        <span className="font-bold">{productCount}</span>
        <button
          className="btn btn-circle  bg-[#EF6024] border-[#EF6024] hover:bg-[#EF6024] hover:border-[#EF6024] text-white"
          onClick={reduceFromCart}
        >
          -
        </button>
      </div>
    );
  }

  return (
    <button
      className="btn bg-[#EF6024] border-[#EF6024] hover:scale-105 hover:bg-[#EF6024] hover:border-[#EF6024] w-full text-white"
      onClick={addToCart}
    >
      Add To Cart
    </button>
  );
};

export default AddToCartBtn;
