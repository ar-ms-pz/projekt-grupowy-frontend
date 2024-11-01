import { STRINGS } from '@/strings';
import { Home } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

interface Props {
    className?: string;
}

export const Logo = ({ className }: Props) => (
    <Button
        variant="ghost"
        className={cn(
            'rounded-none py-6 flex items-center text-lg font-medium hover:bg-transparent',
            className,
        )}
        asChild
    >
        <Link to="/">
            <Home size={24} className="min-w-6 min-h-6" />
            {STRINGS.BRAND_NAME}
        </Link>
    </Button>
);
