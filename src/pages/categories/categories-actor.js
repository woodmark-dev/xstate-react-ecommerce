import { assign, fromPromise, setup } from "xstate";

const data = [
  {
    name: "electronics",
    image_src:
      "https://upload.wikimedia.org/wikipedia/commons/4/42/Mobile_electronic_gadgets_%28Unsplash%29.jpg",
    id: 1,
  },
  {
    name: "jewelery",
    image_src:
      "https://upload.wikimedia.org/wikipedia/commons/0/0a/Jewelry_ring_necklaces.jpg",
    id: 2,
  },
  {
    name: "men's clothing",
    image_src:
      "https://upload.wikimedia.org/wikipedia/commons/4/47/20181109_KUBENZ_clothing_shop_in_the_Manufaktura%2C_Lodz._November_2018_003.jpg",
    id: 3,
  },
  {
    name: "women's clothing",
    image_src:
      "https://upload.wikimedia.org/wikipedia/commons/f/f3/Women%27s_clothes_store_%28Unsplash%29.jpg",
    id: 4,
  },
];

export const categoriesMachine = setup({}).createMachine({
  context: {
    data,
  },
});
