import { Button } from '../../components/button/button';
import $ from './sign-up.module.scss';
import { Link, useNavigate } from '@tanstack/react-router';
import { TextInput } from '../../components/text-input/text-input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { InlineNotification } from '../../components/inline-notification/inline-notification';
import { useEffect, useState } from 'react';
import { ErrorCodes } from '../../api/error-codes';
import { useAuth } from '../../hooks/use-auth';
import { useUserContext } from '../../context/user-context';
import { FetchError } from '../../api/fetch-error';
import { getErrorText } from '../../helpers/get-error-text';

const STRINGS = {
    ALREADY_HAVE_ACCOUNT: 'Already have an account?',
    SIGN_UP: 'Sign up',
    SERVER_ERROR: 'An unknown error occurred. Please try again later',
    USERNAME: 'Username',
    PASSWORD: 'Password',
    CONFIRM_PASSWORD: 'Confirm password',
};

const formSchema = z
    .object({
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
            })
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).+$/,
                {
                    message: `Password must contain at least one uppercase letter, one lowercase letter, one number and one special character from the following: #?!@$ %^&*-`,
                },
            ),
        confirmPassword: z.string(),
    })
    .refine(
        (data) => {
            return data.password === data.confirmPassword;
        },
        {
            message: 'Passwords must match',
            path: ['confirmPassword'],
        },
    );

type FormModel = z.infer<typeof formSchema>;

export const SignUpPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();
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
            await signUp(username, password);
        } catch (e) {
            if (e instanceof FetchError)
                setError(getErrorText(e.errors[0]?.code));
            else setError(ErrorCodes.INTERNAL_SERVER_ERROR);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <main className={$.formWrapper}>
            <form className={$.form} onSubmit={handleSubmit(onSubmit)}>
                <header className={$.formHeader}>
                    <h1 className={$.title}>{STRINGS.SIGN_UP}</h1>
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
                <TextInput
                    id="confirmPassword"
                    label={STRINGS.CONFIRM_PASSWORD}
                    placeholder={STRINGS.CONFIRM_PASSWORD}
                    type="password"
                    error={errors.confirmPassword?.message}
                    register={register}
                />
                <footer className={$.formFooter}>
                    <Link to="/sign-in" className={$.link}>
                        {STRINGS.ALREADY_HAVE_ACCOUNT}
                    </Link>
                    <Button isLoading={isPending} type="submit">
                        {STRINGS.SIGN_UP}
                    </Button>
                </footer>
            </form>
        </main>
    );
};
