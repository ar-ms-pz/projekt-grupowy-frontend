import { ReactNode } from 'react';
import { Button } from '../../button/button';
import { Link } from '@tanstack/react-router';
import $ from './sidebar-item.module.scss';
import { cn } from '../../../utlis/join-class-names';

interface Props {
    text: string;
    icon: ReactNode;
    link: string;
    isActive?: boolean;
}

export const SidebarItem = ({ text, icon, link, isActive }: Props) => (
    <li className={$.item}>
        <Link to={link} disabled={isActive}>
            <Button asChild className={cn($.button, isActive && $.isActive)}>
                {icon}
                {text}
            </Button>
        </Link>
    </li>
);
