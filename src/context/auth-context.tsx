import { createContext, useContext } from 'react';
import { User } from '../api/models/user';

type ContextModel = {
    user: User | null;
};

const AuthContext = createContext<ContextModel>({
    user: null,
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const user = null;

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};
