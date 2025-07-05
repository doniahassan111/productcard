import { create } from "zustand";

// نحاول نقرأ الحالة من localStorage لما التطبيق يشتغل
const getInitialState = () => {
  const stored = localStorage.getItem("comparedProducts");
  return stored ? JSON.parse(stored) : [];
};

const useCompareStore = create((set) => ({
  comparedProducts: getInitialState(),

  addToCompare: (product) =>
    set((state) => {
      if (state.comparedProducts.find((p) => p.id === product.id)) return state;

      if (state.comparedProducts.length >= 3) {
        alert("❗ لا يمكنك مقارنة أكثر من 3 منتجات");
        return state;
      }

      const updated = [...state.comparedProducts, product];
      localStorage.setItem("comparedProducts", JSON.stringify(updated));
      return { comparedProducts: updated };
    }),

  removeFromCompare: (id) =>
    set((state) => {
      const updated = state.comparedProducts.filter((p) => p.id !== id);
      localStorage.setItem("comparedProducts", JSON.stringify(updated));
      return { comparedProducts: updated };
    }),
}));

export default useCompareStore;
