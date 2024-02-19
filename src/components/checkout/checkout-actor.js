import { setup, assign } from "xstate";

export const checkoutMachine = setup({
  actions: {
    updatePrice: assign({
      totalPrice: ({ event }) =>
        event.totalPrice.toLocaleString("en-US", { maximumFractionDigits: 2 }),
    }),
  },
}).createMachine({
  context: {
    totalPrice: 0,
  },
  initial: "modalIdle",
  states: {
    modalIdle: {
      on: {
        TOGGLE: {
          target: "modalActive",
        },
      },
    },
    modalActive: {
      on: {
        TOGGLE: {
          target: "modalIdle",
        },
      },
    },
  },
  on: {
    UPDATE_PRICE: {
      actions: ["updatePrice"],
    },
  },
});
