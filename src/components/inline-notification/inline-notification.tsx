import { ReactNode } from 'react';
import $ from './inline-notification.module.scss';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { cn } from '../../utils/join-class-names';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
    children: ReactNode;
    kind: 'error' | 'success' | 'info';
};

const iconMap = {
    error: AlertCircle,
    success: CheckCircle,
    info: Info,
};

export const InlineNotification = ({ children, kind }: Props) => {
    const Icon = iconMap[kind];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                className={$.wrapper}
            >
                <Icon size="20" className={cn($.icon, $[kind])} />
                <p className={cn($.text, $[kind])}>{children}</p>
            </motion.div>
        </AnimatePresence>
    );
};
