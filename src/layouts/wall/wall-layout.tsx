import { ReactNode } from 'react';
import { Sidebar } from '../../components/sidebar/sidebar';
import $ from './wall-layout.module.scss';

interface Props {
    children: ReactNode;
}

export const WallLayout = ({ children }: Props) => {
    return (
        <div className={$.layout}>
            <div className={$.sidebar}>
                <Sidebar />
            </div>
            <div className={$.content}>
                <main className={$.main}>{children}</main>
            </div>
            <div className={$.placeholder} />
        </div>
    );
};
