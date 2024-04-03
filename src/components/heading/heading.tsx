import $ from './heading.module.scss';

type Props = {
    heading: string;
};

export const Heading = ({ heading }: Props) => (
    <h1 className={$.heading}>{heading}</h1>
);
