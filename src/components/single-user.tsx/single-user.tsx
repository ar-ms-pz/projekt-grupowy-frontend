import { useUser } from '../../api/users/use-user';
import { PostList } from '../post-list/post-list';

interface Props {
    id: number;
}

export const SingleUser = ({ id }: Props) => {
    const { data: response } = useUser({
        id: id,
    });

    if (response.errors) {
        return (
            <div>
                {response.errors.map((error) => (
                    <p key={error.code}>{error.message}</p>
                ))}
            </div>
        );
    }

    return (
        <div>
            <h1>{response.data.name}'s posts</h1>

            <PostList userId={id} />
        </div>
    );
};
