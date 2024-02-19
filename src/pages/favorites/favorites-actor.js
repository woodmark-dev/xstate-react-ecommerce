import { setup, assign } from "xstate";
import { addToCartBtnMachine } from "../../components/add-to-cart-btn/add-to-cart-btn-actor";
import { addToFavMachine } from "../../components/add-to-fav-btn/add-to-fav-actor";

export const favoritesMachine = setup({
  actions: {
    updateFavorites: assign({
      favorites: ({ event, spawn }) =>
        event.favorites.map((item) => ({
          ...item,
          btnMachineRef: spawn(addToCartBtnMachine),
          addToFavBtnRef: spawn(addToFavMachine),
        })),
    }),
  },
}).createMachine({
  context: {
    favorites: [],
  },
  on: {
    UPDATE_FAVORITES: {
      actions: ["updateFavorites"],
    },
  },
});
