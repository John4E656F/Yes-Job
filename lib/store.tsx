import { create } from 'zustand';

interface User {
  id: string;
  email?: string;
  phone?: string;
  confirmed_at?: string;
}

interface UserStoreInterface extends User {
  lastUpdate: number;
  setUser: (user: User) => void;
  reset: () => void;
}

const getDefaultInitialState = (): UserStoreInterface => ({
  lastUpdate: Date.now(),
  id: '',
  email: '',
  phone: '',
  confirmed_at: '',
  setUser: () => {},
  reset: () => {},
});

export const useStore = create<UserStoreInterface>((set) => ({
  ...getDefaultInitialState(),
  setUser: (user) => {
    set({
      ...user,
      lastUpdate: Date.now(),
    });
  },
  reset: () => {
    set(getDefaultInitialState());
  },
}));
