import $ from './avatar.module.scss';

type Props = {
    initials: string;
};

export const Avatar = ({ initials }: Props) => {
    return <div className={$.avatar}>{initials}</div>;
};
