import { setup, sendTo, assign } from "xstate";

export const addToCartBtnMachine = setup({
  actions: {
    addToCart: sendTo(
      ({ system }) => system.get("cartIcon"),
      ({ event }) => ({ type: "ADD_TO_CART", product: event.product })
    ),
    reduceFromCart: sendTo(
      ({ system }) => system.get("cartIcon"),
      ({ event }) => ({ type: "REDUCE_FROM_CART", product: event.product })
    ),
    addCount: assign({
      productCount: ({ context }) => context.productCount + 1,
    }),
    reduceCount: assign({
      productCount: ({ context }) => context.productCount - 1,
    }),
    syncCount: assign({
      productCount: ({ event, system }) => {
        const cart = system.get("cartIcon").getSnapshot().context.cart;
        const isInCart = cart.find((item) => item.id === event.productId);
        if (isInCart) {
          return isInCart.count;
        }
        return 0;
      },
    }),
  },
}).createMachine({
  initial: "notActive",
  context: {
    //Private state for the button. We sync the product count of the item in the cart with the product count within the button machine
    //Any further interaction is independent, since we want each component to be able to has its own state and control its behavior.
    productCount: 0,
  },
  states: {
    notActive: {
      on: {
        ADD_PRODUCT_COUNT: {
          target: "active",
          actions: ["addToCart", "addCount"],
        },
        SYNC_COUNT: {
          actions: ["syncCount"],
        },
      },
      always: {
        guard: ({ context }) => context.productCount > 0,
        target: "active",
      },
    },
    active: {
      on: {
        ADD_PRODUCT_COUNT: {
          target: "active",
          actions: ["addToCart", "addCount"],
        },
        REDUCE_PRODUCT_COUNT: [
          {
            guard: ({ context }) => context.productCount === 1,
            actions: ["reduceFromCart", "reduceCount"],
            target: "notActive",
          },
          {
            guard: ({ context }) => context.productCount > 1,
            actions: ["reduceFromCart", "reduceCount"],
            target: "active",
          },
        ],
      },
    },
  },
});
