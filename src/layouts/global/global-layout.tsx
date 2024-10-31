import { Outlet } from '@tanstack/react-router';
import { useCurrentUser } from '../../api/users/use-current-user';
import { UserContext } from '../../context/user-context';

export const GlobalLayout = () => {
    const { data } = useCurrentUser();

    return (
        <UserContext.Provider value={data.data}>
            <Outlet />
        </UserContext.Provider>
    );
};
