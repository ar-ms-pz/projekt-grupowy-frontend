import { ReactNode } from 'react';
import { Header } from '@/components/header/header';

interface Props {
    children: ReactNode;
}

export const WallLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <main className="h-[calc(100vh-4rem)]">{children}</main>
        </>
    );
};
