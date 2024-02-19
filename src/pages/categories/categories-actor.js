import { assign, fromPromise, setup } from "xstate";

const fetchCategories = fromPromise(async () => {
  const data = await fetch("../data.json");
  return await data.json();
});

const loadCategories = assign({
  categories: ({ event }) => event.output,
});

export const categoriesMachine = setup({
  actors: {
    fetchCategories,
  },
  actions: {
    loadCategories,
  },
}).createMachine({
  context: {
    categories: undefined,
  },
  initial: "loadData",
  states: {
    loadData: {
      invoke: {
        src: "fetchCategories",
        onDone: {
          actions: "loadCategories",
        },
        onError: {
          target: "retry",
        },
      },
    },
    retry: {
      after: {
        2000: {
          target: "loadData",
        },
      },
    },
  },
});
