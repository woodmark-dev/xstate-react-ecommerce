import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "@xstate/react";
import { rootContext } from "../../RootContext";
import AddToCartBtn from "../../components/add-to-cart-btn/add-to-cart-btn-component";
import AddToFavBtn from "../../components/add-to-fav-btn/add-to-fav-component";

const ProductDetails = () => {
  const { id } = useParams();
  const machineRef = rootContext.useActorRef().system.get("productDetails");

  useEffect(() => {
    machineRef.send({ type: "SET_PRODUCT_ID", id });
  }, [machineRef, id]);

  const { product, state } = useSelector(machineRef, ({ context, value }) => ({
    product: context.product,
    state: value,
  }));

  if (state === "fetchingProduct" || !product) {
    return <div>..Loading</div>;
  }
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 border-2 md:p-10 p-2 shadow-md dark:bg-[#196774] rounded-md">
      <figure className="md:mx-20">
        <img src={product.image} alt={product.title} className="w-full" />
      </figure>
      <div className="flex flex-col flex-wrap md:gap-10 gap-3 mt-3">
        <div className="flex justify-between">
          <p className="text-lg">{product.title}</p>
          <AddToFavBtn product={product} />
        </div>
        <p className="font-bold text-lg">{`$ ${product.price}`}</p>
        <div>
          <h2 className="font-bold text-lg my-4">Product Details</h2>
          <p>{product.description}</p>
        </div>
        <div>
          <AddToCartBtn product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
