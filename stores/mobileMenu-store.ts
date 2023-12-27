import { create } from "zustand";

export interface MobileMenuStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMobileMenuStore = create<MobileMenuStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
