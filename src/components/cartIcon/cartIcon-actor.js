import { setup, assign, sendTo } from "xstate";

export const cartIconActor = setup({
  actions: {
    addToCart: assign({
      cart: ({ context, event }) => {
        const isInCart = context.cart.find(
          (product) => product.id === event.product.id
        );
        if (isInCart) {
          return context.cart.map((product) => {
            if (product.id === isInCart.id)
              return { ...product, count: product.count + 1 };
            return product;
          });
        }
        return context.cart.concat({ ...event.product, count: 1 });
      },
    }),
    reduceFromCart: assign({
      cart: ({ context, event }) => {
        const foundItem = context.cart.find(
          (product) => product.id === event.product.id
        );
        if (foundItem) {
          if (foundItem.count === 1) {
            return context.cart.filter(
              (product) => product.id !== foundItem.id
            );
          }
          if (foundItem.count > 1) {
            return context.cart.map((product) => {
              if (product.id === foundItem.id)
                return { ...product, count: product.count - 1 };
              return product;
            });
          }
        }
        return context.cart;
      },
    }),
    deleteItem: assign({
      cart: ({ context, event }) => {
        const foundItem = context.cart.find(
          (product) => product.id === event.productId
        );
        if (foundItem) {
          return context.cart.filter((product) => product.id !== foundItem.id);
        }
        return context.cart;
      },
    }),
    syncCount: assign({
      cartCount: ({ context }) =>
        context.cart.map((item) => item.count).reduce((acc, cv) => acc + cv, 0),
    }),
    sendTotalPrice: sendTo(
      ({ system }) => system.get("checkout"),
      ({ context }) => ({
        type: "UPDATE_PRICE",
        totalPrice: context.cart
          .map((item) => item.price * item.count)
          .reduce((acc, cv) => acc + cv, 0),
      })
    ),
    sendUpdatedCart: sendTo(
      ({ system }) => system.get("cart"),
      ({ context }) => ({
        type: "UPDATE_CART",
        cart: context.cart,
      })
    ),
  },
}).createMachine({
  context: {
    cart: [],
    cartCount: 0,
  },
  on: {
    ADD_TO_CART: {
      actions: ["addToCart", "syncCount", "sendTotalPrice", "sendUpdatedCart"],
    },
    REDUCE_FROM_CART: {
      actions: [
        "reduceFromCart",
        "syncCount",
        "sendTotalPrice",
        "sendUpdatedCart",
      ],
    },
    DELETE_ITEM: {
      actions: ["deleteItem", "syncCount", "sendTotalPrice", "sendUpdatedCart"],
    },
  },
});
