import { useSelector } from "@xstate/react";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/product-card/product-card-component";
import { rootContext } from "../../RootContext";
import { useEffect } from "react";

const Products = () => {
  const { name } = useParams();
  const machineRef = rootContext.useActorRef().system.get("products");

  useEffect(() => {
    machineRef.send({ type: "SET_CATEGORY_NAME", name });
  }, [machineRef, name]);

  const { data, state } = useSelector(machineRef, ({ context, value }) => ({
    data: context.products,
    state: value,
  }));

  if (state === "fetchingProducts" || !data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex md:justify-start justify-center flex-wrap gap-6">
      {data.map((item) => (
        <Link
          key={item.id}
          to={`${item.id}`}
          className="hover:scale-105 transition-transform md:basis-[32%] basis-[90%]"
        >
          <Card product={item} />
        </Link>
      ))}
    </div>
  );
};

export default Products;
