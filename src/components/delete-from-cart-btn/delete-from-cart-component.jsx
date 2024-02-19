import { HiArchiveBoxXMark } from "react-icons/hi2";

const DeleteFromCartBtn = ({ product }) => {
  const {
    deleteBtnMachineRef: { send },
  } = product;
  const handleDeleteClick = (e) => {
    e.preventDefault();
    send({ type: "DELETE_ITEM", productId: product.id });
  };

  return (
    <button onClick={handleDeleteClick} className="bg-inherit">
      <HiArchiveBoxXMark className="w-7 h-7 text-red-500 active:scale-75 transition-transform" />
    </button>
  );
};

export default DeleteFromCartBtn;
