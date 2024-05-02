import { Button } from '../../components/button/button';
import $ from './sign-in.module.scss';
import { Link } from '@tanstack/react-router';
import { TextInput } from '../../components/text-input/text-input';
import { useSignIn } from '../../api/auth/use-sign-in';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { InlineNotification } from '../../components/inline-notification/inline-notification';
import { useState } from 'react';

const STRINGS = {
    DONT_HAVE_AN_ACCOUNT: "Don't have an account?",
    SIGN_IN: 'Sign in',
    INVALID_CREDENTIALS: 'Invalid username or password',
    SERVER_ERROR: 'An unknown error occurred. Please try again later',
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
    const { mutateAsync, isPending } = useSignIn();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormModel>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormModel) => {
        try {
            const result = await mutateAsync(data);

            if (!result.errors) return setError(null);

            const isInvalidCredentials = result.errors.some(
                (error) => error.code === 'invalid_credentials',
            );

            if (isInvalidCredentials)
                return setError(STRINGS.INVALID_CREDENTIALS);

            setError(STRINGS.SERVER_ERROR);
        } catch (e) {
            setError(STRINGS.SERVER_ERROR);
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
