import { useSelector } from "@xstate/react";
import { rootContext } from "../../RootContext";
import Modal from "../modal/modal-component";

const Checkout = () => {
  const checkoutActorRef = rootContext.useActorRef().system.get("checkout");
  const { totalPrice, modalState } = useSelector(checkoutActorRef, (state) => ({
    modalState: state.value,
    totalPrice: state.context.totalPrice,
  }));

  const toggleModal = () => {
    checkoutActorRef.send({ type: "TOGGLE" });
  };
  return (
    <div className="border-2 border-blue-400 p-3 rounded-lg shadow-md">
      <h2 className="font-bold text-xs uppercase pt-3 pl-2 opacity-80">
        cart summary
      </h2>
      <div className="divider divider-primary m-0"></div>
      <div className="flex justify-between px-3">
        <p>Subtotal</p>
        <p className="text-lg font-bold">${totalPrice}</p>
      </div>
      <div className="divider divider-primary m-0"></div>
      <div className="px-2">
        <button
          className="btn w-full text-sm font-bold  bg-[#EF6024] border-[#EF6024] hover:scale-105 hover:bg-[#EF6024] hover:border-[#EF6024] text-white"
          onClick={toggleModal}
        >
          <span className="uppercase">checkout</span>
          <span>(${totalPrice})</span>
        </button>
      </div>
      {modalState === "modalActive" && (
        <Modal>
          <div className="fixed top-[30%] left-[10%] md:absolute w-80 bg-gray-800 text-white md:top-[35%] md:left-[35%] p-5 rounded-md">
            <h2 className="font-bold text-xs uppercase opacity-80 text-center">
              Checkout
            </h2>
            <div className="divider divider-info m-0"></div>
            <div className="py-7">
              <p className="font-bold">Coming soon</p>
            </div>
            <div className="text-right">
              <button className="btn btn-primary" onClick={toggleModal}>
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Checkout;
