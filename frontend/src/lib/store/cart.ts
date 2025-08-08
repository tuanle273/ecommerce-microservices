import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  skuCode: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (skuCode: string) => void;
  updateQuantity: (skuCode: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.skuCode === item.skuCode);

        if (existingItem) {
          const updatedItems = currentItems.map((i) =>
            i.skuCode === item.skuCode
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
          set({
            items: updatedItems,
            total: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
          });
        } else {
          const updatedItems = [...currentItems, item];
          set({
            items: updatedItems,
            total: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
          });
        }
      },
      removeItem: (skuCode) => {
        const updatedItems = get().items.filter((i) => i.skuCode !== skuCode);
        set({
          items: updatedItems,
          total: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        });
      },
      updateQuantity: (skuCode, quantity) => {
        const updatedItems = get().items.map((item) =>
          item.skuCode === skuCode ? { ...item, quantity } : item
        );
        set({
          items: updatedItems,
          total: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        });
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
