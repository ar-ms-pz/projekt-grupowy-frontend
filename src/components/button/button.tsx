import { forwardRef } from 'react';
import { cn } from '../../utils/join-class-names';
import $ from './button.module.scss';
import { Loader2 } from 'lucide-react';

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    asChild?: boolean;
    variant?: 'primary' | 'secondary' | 'ghost';
    iconOnly?: boolean;
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
    (
        {
            onClick,
            children,
            className,
            type,
            disabled,
            asChild,
            variant = 'primary',
            iconOnly,
            isLoading,
        },
        ref,
    ) => {
        const Comp = asChild ? 'span' : 'button';

        if (isLoading) {
            return (
                <Comp
                    ref={ref}
                    className={cn(
                        $.button,
                        variant === 'primary' && $.primary,
                        variant === 'secondary' && $.secondary,
                        variant === 'ghost' && $.ghost,
                        iconOnly && $.iconOnly,
                        disabled && $.disabled,
                        className,
                    )}
                    type={type}
                    disabled
                >
                    <Loader2 size={16} className={$.loader} />
                    {children}
                </Comp>
            );
        }

        return (
            <Comp
                ref={ref}
                onClick={!disabled ? onClick : undefined}
                disabled={disabled}
                className={cn(
                    $.button,
                    variant === 'primary' && $.primary,
                    variant === 'secondary' && $.secondary,
                    variant === 'ghost' && $.ghost,
                    iconOnly && $.iconOnly,
                    disabled && $.disabled,
                    className,
                )}
                type={type}
            >
                {children}
            </Comp>
        );
    },
);

Button.displayName = 'Button';

export { Button };
