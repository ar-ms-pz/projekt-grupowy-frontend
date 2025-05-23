'use client';

import { cn, withRef } from '@udecode/cn';
import { PlateLeaf } from '@udecode/plate-common/react';

export const CodeLeaf = withRef<typeof PlateLeaf>(
    ({ children, className, ...props }, ref) => {
        return (
            <PlateLeaf
                ref={ref}
                as="code"
                className={cn(
                    className,
                    'whitespace-pre-wrap rounded-md bg-muted px-[0.3em] py-[0.2em] font-mono text-sm',
                )}
                {...props}
            >
                {children}
            </PlateLeaf>
        );
    },
);
