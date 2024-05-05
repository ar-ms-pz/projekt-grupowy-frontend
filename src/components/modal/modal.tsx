import {
    FloatingFocusManager,
    FloatingOverlay,
    useClick,
    useDismiss,
    useFloating,
    useId,
    useInteractions,
    useRole,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { cloneElement, useState } from 'react';
import { createPortal } from 'react-dom';
import $ from './modal.module.scss';
import { Button } from '../button/button';
import { X } from 'lucide-react';

interface Props {
    trigger: React.ReactElement;
    children: React.ReactNode;
    title: string;
}

export const Modal = ({ trigger, children, title }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, context } = useFloating<HTMLDivElement>({
        open: isOpen,
        onOpenChange: setIsOpen,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useClick(context),
        useDismiss(context),
        useRole(context, { role: 'dialog' }),
    ]);

    const labelId = useId();
    const descriptionId = useId();

    return (
        <>
            {cloneElement(trigger, {
                ...getReferenceProps(),
                ref: refs.setReference,
            })}
            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={$.overlayWrapper}
                        >
                            <FloatingOverlay lockScroll className={$.overlay}>
                                <FloatingFocusManager context={context}>
                                    <motion.section
                                        className={$.modal}
                                        initial={{ scale: 0.95 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0.95 }}
                                        ref={refs.setReference}
                                        aria-labelledby={labelId}
                                        aria-describedby={descriptionId}
                                        {...getFloatingProps()}
                                    >
                                        <header className={$.header}>
                                            <h1 className={$.title}>{title}</h1>
                                            <Button
                                                variant="ghost"
                                                iconOnly
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <X size={20} />
                                            </Button>
                                        </header>
                                        {children}
                                    </motion.section>
                                </FloatingFocusManager>
                            </FloatingOverlay>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.getElementById('popups')!,
            )}
        </>
    );
};
