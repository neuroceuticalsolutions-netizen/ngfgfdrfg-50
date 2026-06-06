import { createContext, useContext, useEffect, useReducer, useState, type ReactNode } from "react";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "ADD_ITEM"; item: Omit<CartItem, "quantity"> & { quantity?: number } }
  | { type: "REMOVE_ITEM"; slug: string }
  | { type: "UPDATE_QUANTITY"; slug: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; state: CartState };

const STORAGE_KEY = "neuro_cart_v1";

const initialState: CartState = { items: [] };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "ADD_ITEM": {
      const qty = action.item.quantity ?? 1;
      const existing = state.items.find((i) => i.slug === action.item.slug);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.slug === action.item.slug ? { ...i, quantity: i.quantity + qty } : i,
          ),
        };
      }
      return { items: [...state.items, { ...action.item, quantity: qty }] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.slug !== action.slug) };
    case "UPDATE_QUANTITY":
      return {
        items: state.items
          .map((i) => (i.slug === action.slug ? { ...i, quantity: Math.max(0, action.quantity) } : i))
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

export const parsePrice = (price: string): number => {
  const cleaned = price.replace(/[^0-9.]/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
};

export const formatPrice = (n: number): string =>
  `R${n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isOpen, setIsOpen] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (parsed && Array.isArray(parsed.items)) {
          dispatch({ type: "HYDRATE", state: parsed });
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const value: CartContextValue = {
    items: state.items,
    itemCount,
    subtotal,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem: (item) => dispatch({ type: "ADD_ITEM", item }),
    removeItem: (slug) => dispatch({ type: "REMOVE_ITEM", slug }),
    updateQuantity: (slug, quantity) => dispatch({ type: "UPDATE_QUANTITY", slug, quantity }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};