import { forwardRef } from 'react';
import { cn } from '../../utils/join-class-names';
import $ from './button.module.scss';

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    asChild?: boolean;
    variant?: 'primary' | 'secondary' | 'ghost';
    iconOnly?: boolean;
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
        },
        ref,
    ) => {
        const Comp = asChild ? 'span' : 'button';

        return (
            <Comp
                ref={ref}
                onClick={onClick}
                disabled={disabled}
                className={cn(
                    $.button,
                    variant === 'primary' && $.primary,
                    variant === 'secondary' && $.secondary,
                    variant === 'ghost' && $.ghost,
                    iconOnly && $.iconOnly,
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
