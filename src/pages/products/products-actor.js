import { assign, fromPromise, setup } from "xstate";
import { addToCartBtnMachine } from "../../components/add-to-cart-btn/add-to-cart-btn-actor";
import { addToFavMachine } from "../../components/add-to-fav-btn/add-to-fav-actor";

export const productsMachine = setup({
  actors: {
    productsFetcher: fromPromise(async ({ input }) => {
      const data = await fetch(
        `https://fakestoreapi.com/products/category/${input}`
      );
      return await data.json();
    }),
  },
  actions: {
    loadData: assign({
      products: ({ event, spawn }) =>
        event.output.map((product) => ({
          ...product,
          btnMachineRef: spawn(addToCartBtnMachine),
          addToFavBtnRef: spawn(addToFavMachine),
        })),
    }),
    setCategoryName: assign({
      categoryName: ({ event }) => event.name,
    }),
  },
}).createMachine({
  context: {
    products: undefined,
    categoryName: undefined,
  },
  initial: "idle",
  states: {
    idle: {
      on: {
        SET_CATEGORY_NAME: {
          actions: "setCategoryName",
          target: "fetchingProducts",
        },
      },
    },
    fetchingProducts: {
      invoke: {
        src: "productsFetcher",
        onDone: {
          actions: ["loadData"],
          target: "idle",
        },
        input: ({ context }) => context.categoryName,
        onError: {
          actions: ({ event }) => console.log(event),
        },
      },
    },
  },
});
