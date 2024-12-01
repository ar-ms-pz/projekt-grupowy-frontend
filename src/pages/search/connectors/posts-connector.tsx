import { Pagination } from '@/components/pagination';
import { usePosts } from '../../../api/posts/use-posts';
import { PostList } from '../../../components/post-list/post-list';
import { useSearch } from '@tanstack/react-router';

export const PostsConnector = () => {
    const { data } = usePosts();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: Record<string, any> = useSearch({
        from: '/search',
    });

    const totalPages = Math.ceil(data.info.total / data.info.limit);
    const currentPage = Math.ceil(data.info.offset / data.info.limit) + 1;

    return (
        <div className="pb-4">
            <PostList posts={data.data} />
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                linkTo="/search"
                linkSearch={params}
            />
        </div>
    );
};
