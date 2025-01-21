import {
  type Dispatch,
  type ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";
import type { CartFireworks, Firework } from "../../home/types";
import { getStore, setStore } from "../../home/utils";

const CART_FIREWORKS_KEY = "cart-fireworks";

const initialCartFireworks: CartFireworks = getStore(CART_FIREWORKS_KEY) || {};

const CartFireworksContext = createContext<CartFireworks>({});

const CartFireworksDispatchContext = createContext<Dispatch<Action> | null>(
  null
);

function FireworksProvider({ children }: { children: ReactNode }) {
  const [fireworks, dispatch] = useReducer(
    cartFireworksReducer,
    initialCartFireworks
  );

  return (
    <CartFireworksContext.Provider value={fireworks}>
      <CartFireworksDispatchContext.Provider value={dispatch}>
        {children}
      </CartFireworksDispatchContext.Provider>
    </CartFireworksContext.Provider>
  );
}

function useCartFireworks() {
  const context = useContext(CartFireworksContext);
  if (context === null) {
    throw new Error("useCartFireworks 必须在 FireworksProvider 内部使用");
  }
  return context;
}

function useCartFireworksDispatch() {
  const context = useContext(CartFireworksDispatchContext);
  if (context === null) {
    throw new Error(
      "useCartFireworksDispatch 必须在 FireworksProvider 内部使用"
    );
  }
  return context;
}

type Action =
  | { type: "add"; firework: Firework }
  | { type: "clear" }
  | { type: "delete"; id: Firework["id"] };

function cartFireworksReducer(
  cartFireworks: CartFireworks,
  action: Action
): CartFireworks {
  switch (action.type) {
    case "add": {
      const result = {
        ...cartFireworks,
        [action.firework.id]: {
          quantity: (cartFireworks[action.firework.id]?.quantity ?? 0) + 1,
        },
      };
      setStore(CART_FIREWORKS_KEY, result);
      return result;
    }
    case "delete": {
      let result = {
        ...cartFireworks,
      };
      if (!cartFireworks[action.id]) {
        return cartFireworks;
      }
      const quantity = cartFireworks[action.id].quantity - 1;
      if (quantity > 0) {
        result = {
          ...cartFireworks,
          [action.id]: {
            quantity,
          },
        };
      } else {
        delete result[action.id];
      }

      setStore(CART_FIREWORKS_KEY, result);
      return result;
    }
    case "clear": {
      setStore(CART_FIREWORKS_KEY, {});
      return {};
    }
    default: {
      throw new Error(`未知的 action 类型: ${  (action as any).type}`);
    }
  }
}

export { FireworksProvider, useCartFireworks, useCartFireworksDispatch };
