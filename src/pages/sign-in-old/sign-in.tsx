import { Button } from '../../components/button/button';
import $ from './sign-in.module.scss';
import { Link, useNavigate } from '@tanstack/react-router';
import { TextInput } from '../../components/text-input/text-input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { InlineNotification } from '../../components/inline-notification/inline-notification';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { useUserContext } from '../../context/user-context';
import { FetchError } from '../../api/fetch-error';
import { getErrorText } from '../../helpers/get-error-text';

const STRINGS = {
    DONT_HAVE_AN_ACCOUNT: "Don't have an account?",
    SIGN_IN: 'Sign in',
    INTERNAL_SERVER_ERROR: 'An unknown error occurred. Please try again later',
    USERNAME: 'Username',
    PASSWORD: 'Password',
};

const formSchema = z.object({
    username: z
        .string()
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
        .string()
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
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const user = useUserContext();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormModel>({
        resolver: zodResolver(formSchema),
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

    return (
        <main className={$.formWrapper}>
            <form className={$.form} onSubmit={handleSubmit(onSubmit)}>
                <header className={$.formHeader}>
                    <h1 className={$.title}>{STRINGS.SIGN_IN}</h1>
                    <Link to="/">
                        <Button iconOnly variant="ghost" type="button" asChild>
                            <X size={20} />
                        </Button>
                    </Link>
                </header>

                {error && (
                    <InlineNotification kind="error">
                        {error}
                    </InlineNotification>
                )}

                <TextInput
                    id="username"
                    label={STRINGS.USERNAME}
                    placeholder={STRINGS.USERNAME}
                    type="text"
                    error={errors.username?.message}
                    register={register}
                />
                <TextInput
                    id="password"
                    label={STRINGS.PASSWORD}
                    placeholder={STRINGS.PASSWORD}
                    type="password"
                    error={errors.password?.message}
                    register={register}
                />
                <footer className={$.formFooter}>
                    <Link to="/sign-up" className={$.link}>
                        {STRINGS.DONT_HAVE_AN_ACCOUNT}
                    </Link>
                    <Button isLoading={isPending} type="submit">
                        {STRINGS.SIGN_IN}
                    </Button>
                </footer>
            </form>
        </main>
    );
};
