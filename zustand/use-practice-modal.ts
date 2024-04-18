import { create } from "zustand";

type State = {
  isOpen: boolean;
};

type Action = { open: () => void; close: () => void };

const usePracticeModal = create<State & Action>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default usePracticeModal;
