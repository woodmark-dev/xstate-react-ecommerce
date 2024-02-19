import { useSelector } from "@xstate/react";
import { rootContext } from "../../RootContext";
import HeartSvg from "../heart-svg/heart-svg-component";

const FavIcon = () => {
  const favIconActorRef = rootContext.useActorRef().system.get("favIcon");
  const { favCount, state } = useSelector(favIconActorRef, (state) => ({
    favCount: state.context.favorites.length,
    state: state.value,
  }));

  return (
    <div className="indicator grid grid-cols-2">
      <span className="indicator-item badge badge-secondary bg-red-400">
        {favCount}
      </span>
      <HeartSvg state={state} />
    </div>
  );
};

export default FavIcon;
