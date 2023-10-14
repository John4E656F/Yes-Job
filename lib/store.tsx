import { create } from 'zustand';

interface User {
  id: string | null;
  email?: string;
  phone?: string | number | null;
  confirmed_at?: string;
  user_id?: string | null;
  user_logo?: string;
  user_name?: string;
  user_total_request_count?: number;
  isCompany?: boolean;
  contactName?: string;
  created_at?: string;
  countryCode?: string | null;
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
