import { create } from 'zustand';
import { UsersTypes } from '@/types';

interface UserStoreInterface extends UsersTypes {
  lastUpdate: number;
  setUser: (user: UsersTypes) => void;
  reset: () => void;
}

const getDefaultInitialState = (): UserStoreInterface => ({
  lastUpdate: Date.now(),
  id: '',
  user_email: '',
  user_id: '',
  user_name: '',
  user_logo: '',
  isCompany: false,
  phone: '',
  confirmed_at: '',
  created_at: '',
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
