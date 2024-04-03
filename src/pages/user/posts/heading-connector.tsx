import { useUser } from '../../../api/users/use-user';
import { Heading } from '../../../components/heading/heading';
import { capitalize } from '../../../utils/capitalize';

type Props = {
    userId: number;
};

export const UserHeadingConnector = ({ userId }: Props) => {
    const { data } = useUser({
        userId,
    });

    if (data.errors) {
        return (
            <div>
                {data.errors.map((error) => (
                    <p key={error.code}>{error.message}</p>
                ))}
            </div>
        );
    }

    return <Heading heading={`${capitalize(data.data.name)}'s posts`} />;
};
