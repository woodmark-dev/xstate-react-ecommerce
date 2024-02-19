import { setup, assign, sendTo } from "xstate";

export const favIconMachine = setup({
  actions: {
    addToFavorites: assign({
      favorites: ({ event, context }) => {
        const isInFavorites = context.favorites.find(
          (product) => product.id === event.product.id
        );
        if (isInFavorites) {
          return context.favorites;
        }
        return context.favorites.concat(event.product);
      },
    }),
    removeFromFavorites: assign({
      favorites: ({ event, context }) =>
        context.favorites.filter((product) => product.id !== event.product.id),
    }),
    sendUpdateFavorites: sendTo(
      ({ system }) => system.get("favorites"),
      ({ context }) => ({
        type: "UPDATE_FAVORITES",
        favorites: context.favorites,
      })
    ),
  },
}).createMachine({
  context: {
    favorites: [],
  },
  initial: "inactive",
  states: {
    inactive: {
      on: {
        ADD_TO_FAVORITES: {
          target: "active",
          actions: ["addToFavorites", "sendUpdateFavorites"],
        },
      },
    },
    active: {
      on: {
        ADD_TO_FAVORITES: {
          actions: ["addToFavorites", "sendUpdateFavorites"],
        },
        REMOVE_FROM_FAVORITES: {
          actions: ["removeFromFavorites", "sendUpdateFavorites"],
        },
      },
      always: {
        guard: ({ context }) => context.favorites.length === 0,
        target: "inactive",
      },
    },
  },
});
