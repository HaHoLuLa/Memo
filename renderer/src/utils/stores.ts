import { create } from "zustand";

interface PathStore {
  path: string | null;
  setPath: (path: string | null) => void;
}

interface TitleStore {
  title: string;
  setTitle: (title: string) => void;
}

export const usePathStore = create<PathStore>((set) => ({
  path: null,
  setPath: (path) => set({ path }),
}));

export const useTitleStore = create<TitleStore>((set) => ({
  title: "Memo",
  setTitle: (title) => set({ title }), 
}));