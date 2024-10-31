import { STRINGS } from '@/strings';
import { Home } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from '@tanstack/react-router';

export const Logo = () => (
    <Button
        variant="ghost"
        className="py-6 flex items-center text-lg font-medium"
        asChild
    >
        <Link to="/">
            <Home size={24} className="min-w-6 min-h-6" />
            {STRINGS.BRAND_NAME}
        </Link>
    </Button>
);
