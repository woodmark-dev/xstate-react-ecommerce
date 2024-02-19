import { sendTo, setup } from "xstate";

export const deleteFromCartBtnMachine = setup({
  actions: {
    sendDeleteEvent: sendTo(
      ({ system }) => system.get("cartIcon"),
      ({ event }) => ({ type: "DELETE_ITEM", productId: event.productId })
    ),
  },
}).createMachine({
  on: {
    DELETE_ITEM: {
      actions: ["sendDeleteEvent"],
    },
  },
});
