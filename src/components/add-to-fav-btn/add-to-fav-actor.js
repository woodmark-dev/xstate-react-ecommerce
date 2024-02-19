import { assign, sendTo, setup } from "xstate";

export const addToFavMachine = setup({
  actions: {
    addToCart: sendTo(
      ({ system }) => system.get("favIcon"),
      ({ event }) => ({ type: "ADD_TO_FAVORITES", product: event.product })
    ),
    removeFromCart: sendTo(
      ({ system }) => system.get("favIcon"),
      ({ event }) => ({ type: "REMOVE_FROM_FAVORITES", product: event.product })
    ),
    sync: assign({
      isInFavorites: ({ event, system }) => {
        const favorites = system.get("favIcon").getSnapshot().context.favorites;
        const isInCount = favorites.find(
          (product) => product.id === event.productId
        );
        if (isInCount) {
          return true;
        }
        return false;
      },
    }),
  },
}).createMachine({
  initial: "inactive",
  context: {
    isInFavorites: false,
  },
  states: {
    inactive: {
      on: {
        ADD_OR_REMOVE_FAVORITE: {
          target: "active",
          actions: ["addToCart"],
        },
        SYNC: {
          actions: ["sync"],
        },
      },
      always: {
        guard: ({ context }) => context.isInFavorites === true,
        target: "active",
      },
    },
    active: {
      on: {
        ADD_OR_REMOVE_FAVORITE: {
          target: "inactive",
          actions: ["removeFromCart", "sync"],
        },
      },
    },
  },
});
