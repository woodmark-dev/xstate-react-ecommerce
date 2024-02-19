import { setup } from "xstate";

export const themeToggleMachine = setup({
  actions: {
    activateDarkMode: ({ context }) => {
      context.htmlRef.classList.add("dark");
    },
    activateLightMode: ({ context }) => {
      context.htmlRef.classList.remove("dark");
    },
  },
}).createMachine({
  context: {
    htmlRef: document.documentElement,
  },
  initial: "lightMode",
  states: {
    lightMode: {
      on: {
        TOGGLE: {
          target: "darkMode",
          actions: "activateDarkMode",
        },
      },
    },
    darkMode: {
      on: {
        TOGGLE: {
          target: "lightMode",
          actions: "activateLightMode",
        },
      },
    },
  },
});
