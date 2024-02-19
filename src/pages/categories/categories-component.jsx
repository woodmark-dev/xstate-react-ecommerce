import { useSelector } from "@xstate/react";
import { Link } from "react-router-dom";
import { rootContext } from "../../RootContext";

const Categories = () => {
  const machineRef = rootContext.useActorRef().system.get("categories");
  const { data } = useSelector(machineRef, ({ context }) => context);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {data.map((item) => (
        <Link
          key={item.id}
          to={`category/${item.name}`}
          className="hover:scale-105 transition-transform md:basis-[40%] basis-[90%]"
        >
          <figure className="flex flex-nowrap flex-col relative border-4 border-blue-800">
            <img
              src={item.image_src}
              alt="category Image"
              className="object-cover w-full category-image h-[17rem]"
            />
            <figcaption className="absolute bottom-0 bg-slate-700 text-white w-full h-20 p-5 uppercase opacity-80">
              {item.name}
            </figcaption>
          </figure>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
