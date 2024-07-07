// stores/categoryStore.ts
import create, { StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  createdAt: string | Date;
};

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  clearCart: () => void;
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
      addToCart: (product) =>
        set((state) => {
          const existingProduct = state.cart.find(
            (cartProduct) => cartProduct.id === product.id
          );

          if (existingProduct) {
            return {
              cart: state.cart.map((cartProduct) =>
                cartProduct.id === product.id
                  ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
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
                  createdAt: new Date(),
                },
              ],
            };
          }
        }),
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
