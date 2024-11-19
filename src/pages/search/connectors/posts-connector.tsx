import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { usePosts } from '../../../api/posts/use-posts';
import { PostList } from '../../../components/post-list/post-list';

export const PostsConnector = () => {
    const { data } = usePosts();

    return (
        <div className="pb-4">
            <PostList posts={data.data} />
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="/search" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">5</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="/search" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};
