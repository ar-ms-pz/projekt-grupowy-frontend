import { cn } from '../../utlis/join-class-names';
import $ from './button.module.scss';

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    asChild?: boolean;
    variant?: 'primary' | 'secondary';
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

    const variantClass = variant === 'secondary' ? $.secondary : $.primary;

    return (
        <Comp
            onClick={onClick}
            disabled={disabled}
            className={cn($.button, variantClass, className)}
            type={type}
        >
            {children}
        </Comp>
    );
};
