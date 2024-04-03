import { ReactNode, useEffect, useRef, useState } from 'react';
import $ from './dropdown.module.scss';
import { Button } from '../button/button';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { cn } from '../../utils/join-class-names';

export type DropdownItem = {
    id: string;
    text: string;
    icon: ReactNode;
    onClick: () => void;
};

type Props = {
    items: DropdownItem[];
};

export const Dropdown = ({ items }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [extendUp, setExtendUp] = useState(false);

    const buttonRef = useRef<HTMLButtonElement>(null);
    // const dropdownWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const button = buttonRef.current;

        if (!button) return;

        const handleScroll = () => {
            const { bottom, height } = button.getBoundingClientRect();

            const windowHeight = window.innerHeight;

            setExtendUp(bottom > windowHeight - height - 40);
        };

        handleScroll();
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [buttonRef]);

    return (
        <div className={$.dropdownWrapper}>
            <Button
                variant="ghost"
                className={$.button}
                onClick={() => setIsOpen((prev) => !prev)}
                iconOnly
                ref={buttonRef}
            >
                <DotsHorizontalIcon />
            </Button>

            {isOpen && (
                <ul className={cn($.dropdown, extendUp && $.dropdownUp)}>
                    {items.map((item) => (
                        <li key={item.id} className={$.dropdownListItem}>
                            <button
                                onClick={item.onClick}
                                className={$.dropdownItem}
                            >
                                {item.text}
                                {item.icon}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
