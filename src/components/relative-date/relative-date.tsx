import { formatRelative } from 'date-fns';

export const RelativeDate = ({
    date,
    className,
}: {
    date: Date | string;
    className?: string;
}) => {
    const relativeText = formatRelative(date, new Date(), {});

    const formattedText =
        relativeText.charAt(0).toUpperCase() + relativeText.slice(1);

    return <span className={className}>{formattedText}</span>;
};
