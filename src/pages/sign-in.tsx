import { FetchError } from '@/api/fetch-error';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUserContext } from '@/context/user-context';
import { getErrorText } from '@/api/helpers/get-error-text';
import { useAuth } from '@/hooks/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const STRINGS = {
    DONT_HAVE_AN_ACCOUNT: "Don't have an account?",
    SIGN_IN: 'Sign in',
    INTERNAL_SERVER_ERROR: 'An unknown error occurred. Please try again later',
    USERNAME: 'Username',
    PASSWORD: 'Password',
    SUBMIT: 'Sign in',
    ERROR: 'Error',
};

const formSchema = z.object({
    username: z
        .string({
            message: 'Username is required.',
        })
        .min(3, {
            message: 'Username must be at least 3 characters long.',
        })
        .max(32, {
            message: 'Username can be at most 32 characters long.',
        })
        .regex(/^[a-zA-Z0-9_]+$/, {
            message:
                'Username can only contain letters, numbers, and underscores.',
        }),
    password: z
        .string({
            message: 'Password is required.',
        })
        .min(8, {
            message: 'Password must be at least 8 characters long.',
        })
        .max(32, {
            message: 'Password can be at most 32 characters long.',
        }),
});

type FormModel = z.infer<typeof formSchema>;

export const SignInPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const { signIn } = useAuth();
    const user = useUserContext();
    const navigate = useNavigate();

    const form = useForm<FormModel>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    useEffect(() => {
        if (user) {
            navigate({
                to: '/',
            });
        }
    }, [navigate, user]);

    const onSubmit = async ({ username, password }: FormModel) => {
        setIsPending(true);
        setError(null);

        try {
            await signIn(username, password);
        } catch (e) {
            if (e instanceof FetchError)
                setError(getErrorText(e.errors[0]?.code));
            else setError(STRINGS.INTERNAL_SERVER_ERROR);
        } finally {
            setIsPending(false);
        }
    };

    // User will be redirected
    if (user) return null;

    return (
        <div className="grid grid-cols-1 h-screen w-screen lg:grid-cols-2 justify-center place-items-center lg:place-items-stretch">
            <div className="bg-muted relative hidden lg:block">
                <div className="relative z-20 flex items-center py-4 px-12">
                    <Logo />
                </div>
            </div>

            <div className="container">
                <div className="absolute z-20 flex items-center py-4 px-12 lg:hidden top-0 left-0">
                    <Logo />
                </div>
                <div className="mx-auto flex w-full flex-col justify-center h-full space-y-6 p-12 sm:w-96">
                    <div className="absolute top-6 right-6">
                        <ThemeToggle />
                    </div>
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {STRINGS.SIGN_IN}
                        </h1>
                    </div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            {error && (
                                <Alert variant="destructive">
                                    <ExclamationTriangleIcon className="h-4 w-4" />
                                    <AlertTitle>{STRINGS.ERROR}</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder={STRINGS.USERNAME}
                                                {...field}
                                                autoComplete="username"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder={STRINGS.PASSWORD}
                                                {...field}
                                                type="password"
                                                autoComplete="current-password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="w-full"
                                type="submit"
                                isLoading={isPending}
                            >
                                {STRINGS.SUBMIT}
                            </Button>
                        </form>
                    </Form>
                    <Button variant="link" asChild>
                        <Link to="/sign-up">
                            {STRINGS.DONT_HAVE_AN_ACCOUNT}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
