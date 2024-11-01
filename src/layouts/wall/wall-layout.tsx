import { ReactNode } from 'react';
import { Sidebar } from '../../components/sidebar/sidebar';
import $ from './wall-layout.module.scss';
import { Header } from '@/components/header/header';

interface Props {
    children: ReactNode;
}

export const WallLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <div className={$.layout}>
                <div className={$.sidebar}>
                    <Sidebar />
                </div>
                <div className={$.content}>
                    <main className={$.main}>{children}</main>
                </div>
                <div className={$.placeholder} />
            </div>
        </>
    );
};
