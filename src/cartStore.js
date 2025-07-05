import { create } from "zustand";

const getInitialCart = () => {
  const saved = localStorage.getItem("cartItems");
  return saved ? JSON.parse(saved) : [];
};

const useCartStore = create((set) => ({
  cartItems: getInitialCart(),

  addToCart: (product) =>
    set((state) => {
      const exists = state.cartItems.find((item) => item.id === product.id);
      if (exists) return state;

      const updated = [...state.cartItems, product];
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return { cartItems: updated };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const updated = state.cartItems.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return { cartItems: updated };
    }),
}));

export default useCartStore;
