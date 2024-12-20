import { PostEditor } from '@/components/post-editor/post-editor';
import { usePost } from '../../../api/posts/use-post';

type Props = {
    id: string;
};

export const PostConnector = ({ id }: Props) => {
    const { data } = usePost({
        id,
    });

    return <PostEditor post={data.data} disabled />;
};
