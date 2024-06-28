// stores/categoryStore.js
import create from 'zustand';

export type Category = {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

const useCategoryStore = create((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category: { cateogry: Category }) =>
    set({ selectedCategory: category }),
  clearSelectedCategory: () => set({ selectedCategory: null }),
}));

export default useCategoryStore;
