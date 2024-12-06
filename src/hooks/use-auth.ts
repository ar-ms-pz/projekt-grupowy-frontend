import { useCallback, useEffect, useState } from 'react';
import { TOKEN_REFRESH_THRESHOLD } from '../config';
import { useSignIn } from '../api/auth/use-sign-in';
import { useSignUp } from '../api/auth/use-sign-up';
import { useExtendSession } from '../api/auth/use-extend-session';
import { useLogout } from '../api/auth/use-logout';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '../api/helpers/query-keys';
import { useNavigate } from '@tanstack/react-router';

interface ReturnValues {
    signIn: (username: string, password: string) => Promise<void>;
    signUp: (username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isPending: boolean;
    isAuthenticated: boolean;
}

export const useAuth = (): ReturnValues => {
    const [tokenExpiration, setTokenExpiration] = useState<Date | null>(null);
    const { mutateAsync: signInMutateAsync, isPending: isPendingSignIn } =
        useSignIn();
    const { mutateAsync: signUpMutateAsync, isPending: isPendingSignUp } =
        useSignUp();
    const { mutateAsync: extendSessionMutateAsync } = useExtendSession();
    const { mutateAsync: logoutMutateAsync } = useLogout();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const signIn = useCallback(
        async (username: string, password: string) => {
            await signInMutateAsync({ username, password });

            const tokenExpiration = new Date();

            localStorage.setItem(
                'token-expiration',
                tokenExpiration.toISOString(),
            );

            setTokenExpiration(tokenExpiration);
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.WHO_AM_I],
            });
        },
        [signInMutateAsync, queryClient],
    );

    const signUp = useCallback(
        async (username: string, password: string) => {
            await signUpMutateAsync({ username, password });

            const tokenExpiration = new Date();

            localStorage.setItem(
                'token-expiration',
                tokenExpiration.toISOString(),
            );

            setTokenExpiration(tokenExpiration);
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.WHO_AM_I],
            });
        },
        [signUpMutateAsync, queryClient],
    );

    const extendSession = useCallback(async () => {
        await extendSessionMutateAsync();

        const tokenExpiration = new Date();

        localStorage.setItem('token-expiration', tokenExpiration.toISOString());

        setTokenExpiration(tokenExpiration);
    }, [extendSessionMutateAsync]);

    const signOut = useCallback(async () => {
        await logoutMutateAsync();
        localStorage.removeItem('token-expiration');
        setTokenExpiration(null);
        queryClient.invalidateQueries({
            queryKey: [QueryKeys.WHO_AM_I],
        });
        navigate({ to: '/' });
    }, [logoutMutateAsync, queryClient, navigate]);

    useEffect(() => {
        const tokenExpiration = localStorage.getItem('token-expiration');

        if (!tokenExpiration) {
            setTokenExpiration(null);
            return;
        }

        const expirationDate = new Date(tokenExpiration);

        if (expirationDate <= new Date()) {
            setTokenExpiration(null);
            localStorage.removeItem('token-expiration');
            return;
        }

        setTokenExpiration(expirationDate);

        if (expirationDate <= new Date(Date.now() - TOKEN_REFRESH_THRESHOLD)) {
            extendSession();
        }
    }, [extendSession]);

    return {
        signIn,
        signUp,
        signOut,
        isPending: isPendingSignIn || isPendingSignUp,
        isAuthenticated: !!tokenExpiration,
    };
};
