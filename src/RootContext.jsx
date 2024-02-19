import { createActorContext } from "@xstate/react";
import { createMachine, spawnChild } from "xstate";
import { categoriesMachine } from "./pages/categories/categories-actor";
import { cartIconActor } from "./components/cartIcon/cartIcon-actor";
import { productsMachine } from "./pages/products/products-actor";
import { productDetailsMachine } from "./pages/product-details/product-details-actor";
import { cartMachine } from "./pages/cart/cart-actor";
import { favIconMachine } from "./components/fav-icon/fav-icon-actor";
import { checkoutMachine } from "./components/checkout/checkout-actor";
import { favoritesMachine } from "./pages/favorites/favorites-actor";
import { themeToggleMachine } from "./components/theme-toggle/theme-toggle-actor";

const rootMachine = createMachine({
  entry: [
    spawnChild(themeToggleMachine, { systemId: "theme" }),
    spawnChild(checkoutMachine, { systemId: "checkout" }),
    spawnChild(cartIconActor, { systemId: "cartIcon" }),
    spawnChild(favIconMachine, { systemId: "favIcon" }),
    spawnChild(categoriesMachine, { systemId: "categories" }),
    spawnChild(productsMachine, { systemId: "products" }),
    spawnChild(productDetailsMachine, { systemId: "productDetails" }),
    spawnChild(cartMachine, { systemId: "cart" }),
    spawnChild(favoritesMachine, { systemId: "favorites" }),
  ],
});

export const rootContext = createActorContext(rootMachine);

const RootContext = ({ children }) => {
  return <rootContext.Provider>{children}</rootContext.Provider>;
};

export default RootContext;
