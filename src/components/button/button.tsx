import { cn } from '../../utlis/join-class-names';
import $ from './button.module.scss';

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    asChild?: boolean;
    variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button = ({
    onClick,
    children,
    className,
    type,
    disabled,
    asChild,
    variant = 'primary',
}: Props) => {
    const Comp = asChild ? 'span' : 'button';

    return (
        <Comp
            onClick={onClick}
            disabled={disabled}
            className={cn(
                $.button,
                variant === 'primary' && $.primary,
                variant === 'secondary' && $.secondary,
                variant === 'ghost' && $.ghost,

                className,
            )}
            type={type}
        >
            {children}
        </Comp>
    );
};
