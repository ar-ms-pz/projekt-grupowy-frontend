import { Home } from 'lucide-react';
import { SidebarItem } from './item/sidebar-item';
import $ from './sidebar.module.scss';
import { useRouterState } from '@tanstack/react-router';

const ITEMS = [
    {
        text: 'Home',
        icon: <Home />,
        link: '/',
    },
];

export const Sidebar = () => {
    const location = useRouterState({ select: (s) => s.location });

    return (
        <aside className={$.sidebar}>
            <nav>
                <ul className={$.list}>
                    {ITEMS.map(({ text, icon, link }) => (
                        <SidebarItem
                            key={text}
                            text={text}
                            icon={icon}
                            link={link}
                            isActive={location.pathname === link}
                        />
                    ))}
                </ul>
            </nav>
        </aside>
    );
};
