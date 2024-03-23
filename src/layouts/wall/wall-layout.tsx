import { ReactNode } from 'react';
import { Sidebar } from '../../components/sidebar/sidebar';
import $ from './wall-layout.module.scss';

interface Props {
    heading: string;
    children: ReactNode;
}

export const WallLayout = ({ children, heading }: Props) => {
    return (
        <div className={$.layout}>
            <div className={$.sidebar}>
                <Sidebar />
            </div>
            <div className={$.content}>
                <main className={$.main}>
                    <h1>{heading}</h1>
                    {children}
                </main>
            </div>
            <div className={$.placeholder} />
        </div>
    );
};
