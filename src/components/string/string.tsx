type Props = {
    value: string;
    params: {
        [key: string]: string;
    };
};

export const StringWithParams = ({ value, params }: Props) => {
    const stringWithParams = Object.entries(params).reduce<string>(
        (acc, [key, value]) => acc.replaceAll(`{{${key}}}`, value),
        value,
    );

    return <>{stringWithParams}</>;
};
