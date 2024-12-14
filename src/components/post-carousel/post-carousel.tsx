import { Post } from '@/api/models/post';
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel';
import { PostCarouselItem } from './post-carousel-item';

interface Props {
    posts: Post[];
    displayMode?: 'status' | 'favorite';
}

export const PostCarousel = ({ posts, displayMode = 'favorite' }: Props) => {
    return (
        <Carousel
        // className="rounded-tl-xl rounded-tr-xl sm:rounded-bl-none sm:rounded-tr-none lg:rounded-bl-none lg:rounded-tr-xl xl:rounded-bl-none xl:rounded-tr-none overflow-hidden h-full"
        >
            <CarouselContent className="h-full">
                {posts.map((post, index) => (
                    <PostCarouselItem
                        key={index}
                        post={post}
                        displayMode={displayMode}
                    />
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
        </Carousel>
    );
};
