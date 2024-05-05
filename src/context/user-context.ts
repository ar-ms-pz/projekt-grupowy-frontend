import { createContext, useContext } from 'react';
import { User } from '../api/models/user';

export const UserContext = createContext<User | null>(null);

export const UserProvider = UserContext.Provider;

export const useUserContext = () => useContext(UserContext);
