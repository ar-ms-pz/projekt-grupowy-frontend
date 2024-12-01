import { useMemo } from 'react';
import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    Pagination as PaginationPrimitive,
} from './ui/pagination';

interface Props {
    currentPage: number;
    totalPages: number;
    linkTo: string;
    linkParams?: Record<string, unknown>;
    linkSearch?: Record<string, unknown>;
    showBefore?: number;
    showAfter?: number;
    showFirst?: boolean;
    showLast?: boolean;
}

export const Pagination = ({
    currentPage,
    totalPages,
    linkTo,
    linkParams,
    linkSearch,
    showBefore = 1,
    showAfter = 1,
    showFirst = true,
    showLast = true,
}: Props) => {
    const pages = useMemo(() => {
        const pageArray: (number | 'ellipsis')[] = [];
        const start = Math.max(1, currentPage - showBefore);
        const end = Math.min(totalPages, currentPage + showAfter);

        if (showFirst) {
            pageArray.push(1);
        }

        if (start > 2) {
            pageArray.push('ellipsis' as const);
        }

        for (let i = start; i <= end; i++) {
            if (pageArray.includes(i)) continue;

            pageArray.push(i);
        }

        if (end < totalPages - 1) {
            pageArray.push('ellipsis' as const);
        }

        if (showLast && !pageArray.includes(totalPages)) {
            pageArray.push(totalPages);
        }

        return pageArray;
    }, [currentPage, totalPages, showBefore, showAfter, showFirst, showLast]);

    if (totalPages <= 1) {
        return null;
    }

    return (
        <PaginationPrimitive>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        to={linkTo as any}
                        params={linkParams}
                        search={{
                            ...linkSearch,
                            page: Math.max(1, currentPage - 1),
                        }}
                        disabled={currentPage === 1}
                    />
                </PaginationItem>
                {pages.map((page, index) => (
                    <PaginationItem key={index}>
                        {page === 'ellipsis' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                to={linkTo as any}
                                params={linkParams}
                                search={{ ...linkSearch, page }}
                                isActive={currentPage === page}
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        to={linkTo as any}
                        params={linkParams}
                        search={{
                            ...linkSearch,
                            page: Math.min(totalPages, currentPage + 1),
                        }}
                        disabled={currentPage === totalPages}
                    />
                </PaginationItem>
            </PaginationContent>
        </PaginationPrimitive>
    );
};
