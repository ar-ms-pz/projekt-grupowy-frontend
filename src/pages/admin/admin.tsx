import { useUserContext } from '@/context/user-context';
import { WallLayout } from '@/layouts/wall/wall-layout';
import { UsersConnector } from './connectors/users-connector';
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChangeEvent, Suspense } from 'react';
import { debounce } from '@/utils/debounce';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Loader } from '@/components/loader/loader';
import { AddUserDialog } from '@/components/add-user-dialog';

const STRINGS = {
    ADMIN_PANEL: 'Admin Panel',
    NO_PERMISSION: 'You do not have permission to view this page.',
    CREATE_USER: 'Create User',
    SEARCH_USERS: 'Search users',
};

export const AdminPage = () => {
    const user = useUserContext();
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: Record<string, any> = useSearch({
        from: '/admin',
    });

    const [onSearch] = debounce((e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            navigate({
                search: {
                    page: undefined,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any,
            });
            return;
        }

        if (e.target.value.length < 3) return;

        navigate({
            search: {
                page: undefined,
                search: e.target.value,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
        });
    }, 300);

    if (user?.type !== 'ADMIN')
        throw new Response(STRINGS.NO_PERMISSION, {
            status: 403,
            statusText: STRINGS.NO_PERMISSION,
        });

    return (
        <WallLayout>
            <div className="container px-4 mx-auto pt-6">
                <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">
                    {STRINGS.ADMIN_PANEL}
                </h1>

                <div className="flex justify-between pt-3 pb-4 gap-4">
                    <div className="relative w-full max-w-64">
                        <Input
                            placeholder={STRINGS.SEARCH_USERS}
                            onChange={onSearch}
                            defaultValue={params.search}
                        />
                        <div className="absolute right-0 top-0 p-2">
                            <MagnifyingGlassIcon className="size-5" />
                        </div>
                    </div>

                    <AddUserDialog>
                        <Button>
                            {STRINGS.CREATE_USER}
                            <PlusIcon />
                        </Button>
                    </AddUserDialog>
                </div>
                <Suspense
                    fallback={
                        <div className="w-full h-[calc(100vh-8.25rem)] flex justify-center items-center">
                            <Loader />
                        </div>
                    }
                >
                    <UsersConnector />
                </Suspense>
            </div>
        </WallLayout>
    );
};
