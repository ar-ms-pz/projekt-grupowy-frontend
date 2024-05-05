import { ReactNode, useState } from 'react';
import $ from './dropdown.module.scss';
import { Button } from '../button/button';
import {
    autoUpdate,
    flip,
    offset,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useFocus,
    useInteractions,
    useRole,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Ellipsis } from 'lucide-react';

export type DropdownItem = {
    id: string;
    text: string;
    icon: ReactNode;
    onClick: () => void;
    disabled?: boolean;
};

type Props = {
    items: DropdownItem[];
    className?: string;
    children?: ReactNode;
    offsetPadding?: number;
    shiftPadding?: number;
};

export const Dropdown = ({
    items,
    className,
    children,
    offsetPadding = 4,
    shiftPadding = 8,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, context, x, y, strategy, placement } =
        useFloating<HTMLUListElement>({
            placement: 'bottom-end',
            whileElementsMounted: autoUpdate,
            open: isOpen,
            onOpenChange: setIsOpen,
            middleware: [
                offset(offsetPadding),
                flip(),
                shift({ padding: shiftPadding }),
            ],
        });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useClick(context),
        useDismiss(context),
        useFocus(context),
        useRole(context, { role: 'menu' }),
    ]);

    return (
        <>
            <Button
                variant="ghost"
                className={className}
                iconOnly
                ref={refs.setReference}
                {...getReferenceProps()}
                ariaExpanded={isOpen}
            >
                {children ?? <Ellipsis size="20" />}
            </Button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ ease: 'easeOut', duration: 0.25 }}
                        data-placement={placement}
                        style={{
                            position: strategy,
                            top: y ?? 0,
                            left: x ?? 0,
                        }}
                        className={$.dropdown}
                        ref={refs.setFloating}
                        {...getFloatingProps()}
                    >
                        {items.map((item) => (
                            <li key={item.id} className={$.dropdownListItem}>
                                <button
                                    onClick={item.onClick}
                                    disabled={item.disabled}
                                    className={$.dropdownItem}
                                >
                                    {item.text}
                                    {item.icon}
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </>
    );
};
