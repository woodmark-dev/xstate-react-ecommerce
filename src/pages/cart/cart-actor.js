import { setup, assign } from "xstate";
import { addToCartBtnMachine } from "../../components/add-to-cart-btn/add-to-cart-btn-actor";
import { addToFavMachine } from "../../components/add-to-fav-btn/add-to-fav-actor";
import { deleteFromCartBtnMachine } from "../../components/delete-from-cart-btn/delete-from-cart-actor";

export const cartMachine = setup({
  actions: {
    updateCart: assign({
      cart: ({ event, spawn }) =>
        event.cart.map((item) => ({
          ...item,
          btnMachineRef: spawn(addToCartBtnMachine),
          addToFavBtnRef: spawn(addToFavMachine),
          deleteBtnMachineRef: spawn(deleteFromCartBtnMachine),
        })),
    }),
  },
}).createMachine({
  context: {
    cart: [],
  },
  on: {
    UPDATE_CART: {
      actions: ["updateCart"],
    },
  },
});
