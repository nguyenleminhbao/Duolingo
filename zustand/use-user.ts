import { IUser } from "@/interfaces/user";
import { create } from "zustand";

type State = {
  user: IUser | null;
};

type Action = {
  setUser: (user: IUser) => void;
};

const useUser = create<State & Action>((set) => ({
  user: null,
  setUser: (user) =>
    set(() => ({
      user,
    })),
}));
export default useUser;
