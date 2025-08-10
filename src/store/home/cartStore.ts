// stores/categoryStore.ts
import create, { StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  createdAt: string | Date;
  price?: number;
  stock?: [
    {
      id: number;
      size: string;
      price: number;
      stock: number;
      sku: string;
    }
  ];
};

type CartType = {
  stockId: number;
  quantity: number;
};

interface CartState {
  cart: CartType[];
  addToCart: (product: { stockId: number; quantity: number }) => void;
  clearCart: () => void;
  increment: (stockId: number) => void;
  decrement: (stockId: number) => void;
}
export interface Stock {
  id: number;
  size: string;
  price: number;
  stock: number;
  sku: string;
}

// Define the type for the persisted state
type MyPersistedState = CartState & { _hasHydrated?: boolean };

const useCartStore = create<CartState>(
  (
    persist as (
      config: StateCreator<MyPersistedState, [], []>,
      options: PersistOptions<MyPersistedState>
    ) => StateCreator<MyPersistedState, [], []>
  )(
    (set) => ({
      cart: [],
      addToCart: (product: {
        stockId: number;
        quantity: number;
      }) =>
        set((state) => {
          const existingProduct = state.cart.find(
            (cartProduct) => cartProduct?.stockId === product.stockId
          );

          if (existingProduct) {
            return {
              cart: state.cart.map((cartProduct) =>
                cartProduct.stockId === product.stockId
                  ? {
                    ...cartProduct,
                    quantity: cartProduct.quantity + product.quantity,
                  }
                  : cartProduct
              ),
            };
          } else {
            return {
              cart: [
                ...state.cart,
                {
                  ...product,
                  quantity: 1,
                  stockId: product?.stockId,
                  createdAt: new Date(),
                },
              ],
            };
          }
        }),

      increment: (stockId: number) =>
        set((state) => ({
          cart: state.cart.map((cartProduct) =>
            cartProduct.stockId === stockId
              ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
              : cartProduct
          ),
        })),
      decrement: (stockId: number) =>
        set((state) => ({
          cart: state.cart.map((cartProduct) =>
            cartProduct.stockId === stockId
              ? {
                ...cartProduct,
                quantity: Math.max(cartProduct.quantity - 1, 0), // Prevent negative quantities
              }
              : cartProduct
          ),
        })),
      removeItem: (stockId: number) =>
        set((state) => ({
          cart: state.cart.filter(
            (cartProduct) => cartProduct.stockId !== stockId
          ),
        })),
      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
