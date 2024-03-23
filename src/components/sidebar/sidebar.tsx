import { HomeIcon } from '@radix-ui/react-icons';
import { SidebarItem } from './item/sidebar-item';
import $ from './sidebar.module.scss';
import { useRouter } from '@tanstack/react-router';

const ITEMS = [
    {
        text: 'Home',
        icon: <HomeIcon />,
        link: '/',
    },
];

export const Sidebar = () => {
    const { basepath } = useRouter();

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
                            isActive={basepath === link}
                        />
                    ))}
                </ul>
            </nav>
        </aside>
    );
};
