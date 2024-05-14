import { create } from "zustand";

type ExitModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useExitModel = create<ExitModalState>((set) => ({
  isOpen: true, //TODO: Change back to false
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
