import { createFileRoute } from '@tanstack/react-router';

const PostPage = () => {
    const { postId } = Route.useParams();
    return <div>Post {postId}</div>;
};

export const Route = createFileRoute('/posts/$postId')({
    component: PostPage,
});
