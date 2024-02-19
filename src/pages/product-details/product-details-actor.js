import { assign, fromPromise, setup } from "xstate";
import { addToCartBtnMachine } from "../../components/add-to-cart-btn/add-to-cart-btn-actor";
import { addToFavMachine } from "../../components/add-to-fav-btn/add-to-fav-actor";

export const productDetailsMachine = setup({
  actors: {
    productFetcher: fromPromise(async ({ input }) => {
      const data = await fetch(`https://fakestoreapi.com/products/${input}`);
      return await data.json();
    }),
  },
  actions: {
    loadProduct: assign({
      product: ({ event, spawn }) => ({
        ...event.output,
        btnMachineRef: spawn(addToCartBtnMachine),
        addToFavBtnRef: spawn(addToFavMachine),
      }),
    }),
    loadProductId: assign({
      productId: ({ event }) => event.id,
    }),
  },
}).createMachine({
  context: {
    product: undefined,
    productId: undefined,
  },
  initial: "idle",
  states: {
    idle: {
      on: {
        SET_PRODUCT_ID: {
          actions: "loadProductId",
          target: "fetchingProduct",
        },
      },
    },
    fetchingProduct: {
      invoke: {
        src: "productFetcher",
        input: ({ context }) => context.productId,
        onDone: {
          actions: "loadProduct",
          target: "idle",
        },
        onError: {
          actions: ({ event }) => console.log(event),
        },
      },
    },
  },
});
