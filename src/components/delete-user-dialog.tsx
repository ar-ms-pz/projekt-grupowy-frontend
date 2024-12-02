import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { FetchError } from '@/api/fetch-error';
import { getErrorText } from '@/helpers/get-error-text';
import { useDeleteUser } from '@/api/users/use-delete-user';

const STRINGS = {
    DELETE_USER: 'Delete user',
    DELETE_USER_DESCRIPTION:
        'User will be permanently deleted. This action cannot be undone.',
    ERROR: 'Error',
    INTERNAL_SERVER_ERROR: 'An unknown error occurred. Please try again later',
    CANCEL: 'Cancel',
};

interface Props {
    userId: number;
    children: React.ReactNode;
}

export const DeleteUserDialog = ({ children, userId }: Props) => {
    const { mutateAsync: deleteUserMutateAsync } = useDeleteUser();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onSubmit = async () => {
        setError(null);
        setLoading(true);
        try {
            await deleteUserMutateAsync({ userId });
            setOpen(false);
        } catch (e) {
            if (e instanceof FetchError)
                setError(getErrorText(e.errors[0]?.code));
            else setError(STRINGS.INTERNAL_SERVER_ERROR);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{STRINGS.DELETE_USER}</DialogTitle>
                    <DialogDescription>
                        {STRINGS.DELETE_USER_DESCRIPTION}
                    </DialogDescription>
                </DialogHeader>
                {error && (
                    <Alert variant="destructive">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertTitle>{STRINGS.ERROR}</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <DialogFooter>
                    <Button
                        type="button"
                        disabled={loading}
                        variant="secondary"
                    >
                        {STRINGS.CANCEL}
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={onSubmit}
                        isLoading={loading}
                    >
                        {STRINGS.DELETE_USER}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
