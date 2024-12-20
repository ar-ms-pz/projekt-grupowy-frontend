import { Post } from '@/api/models/post';
import { Button } from '../ui/button';
import {
    ArrowLeft,
    BoxIcon,
    HeartIcon,
    LandPlotIcon,
    MapPinIcon,
} from 'lucide-react';
import { CameraIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { useUserContext } from '@/context/user-context';
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel';
import { getImageUrl } from '@/utils/getImageUrl';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { formatPrice, formatPricePerMeter } from '@/lib/formatters';
import { RichtextEditor } from '../richtext-editor/richtext-editor';

interface Props {
    post?: Post;
    disabled?: boolean;
}

const STRINGS = {
    BACK: 'Back',
    ADD_TO_FAVORITES: 'Add to favorites',
    REMOVE_FROM_FAVORITES: 'Remove from favorites',
    OF: 'of',
    PER_MONTH: 'per month',
    ADDRESS: 'Address',
    AREA: 'Area',
    ROOMS: 'Rooms',
    METERS_SQUARED: 'm²',
};

export const PostEditor = ({ post, disabled }: Props) => {
    const user = useUserContext();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const [bigCarouselApi, setBigCarouselApi] = useState<CarouselApi | null>(
        null,
    );
    const [smallCarouselApi, setSmallCarouselApi] =
        useState<CarouselApi | null>(null);

    useEffect(() => {
        if (!bigCarouselApi) return;

        setCount(bigCarouselApi.scrollSnapList().length);
        setCurrent(bigCarouselApi.selectedScrollSnap() + 1);

        bigCarouselApi.on('select', () => {
            setCurrent(bigCarouselApi.selectedScrollSnap() + 1);
        });
    }, [bigCarouselApi]);

    useEffect(() => {
        if (!smallCarouselApi) return;

        smallCarouselApi.scrollTo(current - 1);
    }, [current, smallCarouselApi]);

    return (
        <div>
            <div className="flex justify-between px-4 pt-4">
                <Button variant="ghost">
                    <ArrowLeft />
                    {STRINGS.BACK}
                </Button>

                <Button disabled={!user} variant="ghost">
                    {post?.isFavorite ? <HeartFilledIcon /> : <HeartIcon />}
                    {post?.isFavorite
                        ? STRINGS.REMOVE_FROM_FAVORITES
                        : STRINGS.ADD_TO_FAVORITES}
                </Button>
            </div>
            <div className="w-full flex justify-center">
                <div className="container p-4 w-2/3 gap-4 flex flex-col">
                    <div className="border rounded-xl py-2 px-4 flex flex-col gap-4">
                        <div className="py-2">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-bold">
                                    {formatPrice(post!.price, post!.type)}
                                </h1>
                                <p className="text-md">
                                    {formatPricePerMeter(
                                        post!.price,
                                        post!.area,
                                    )}
                                </p>
                            </div>
                            <p className="text-md">{post?.title}</p>
                        </div>
                        <div>
                            <Carousel
                                setApi={setBigCarouselApi}
                                className="w-full"
                            >
                                <CarouselContent>
                                    {post?.images.map((image, index) => (
                                        <CarouselItem key={index}>
                                            <img
                                                className="h-full object-cover rounded-lg"
                                                src={getImageUrl(image.url)}
                                                alt={post.title}
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-4" />
                                <CarouselNext className="right-4" />
                                <Badge
                                    variant="secondary"
                                    className="absolute bottom-4 right-4 flex gap-2"
                                >
                                    <CameraIcon />
                                    {current} {STRINGS.OF} {count}
                                </Badge>
                            </Carousel>
                        </div>
                        <Carousel
                            className="w-full mb-2"
                            setApi={setSmallCarouselApi}
                        >
                            <CarouselContent>
                                {post?.images.map((image, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="basis-1/2 md:basis-1/4 xl:basis-1/5"
                                        onClick={() =>
                                            bigCarouselApi?.scrollTo(index)
                                        }
                                    >
                                        <img
                                            className={cn(
                                                'h-full object-cover border-2 rounded-md',
                                                index === current - 1
                                                    ? 'border-primary'
                                                    : 'border-transparent',
                                            )}
                                            src={getImageUrl(image.url)}
                                            alt={post.title}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                    <dl className="border rounded-xl grid grid-cols-2 p-4 gap-1">
                        <dt className="flex gap-2 text-md font-medium items-center">
                            <MapPinIcon size={20} />
                            {STRINGS.ADDRESS}
                        </dt>
                        <dd>{post?.address}</dd>
                        <dt className="flex gap-2 text-md font-medium items-center">
                            <LandPlotIcon size={20} />
                            {STRINGS.AREA}
                        </dt>
                        <dd>
                            {post?.area} {STRINGS.METERS_SQUARED}
                        </dd>
                        <dt className="flex gap-2 font-medium text-md items-center">
                            <BoxIcon size={20} />
                            {STRINGS.ROOMS}
                        </dt>
                        <dd>{post?.rooms}</dd>
                    </dl>
                    <div className="border rounded-xl">
                        <RichtextEditor />
                    </div>
                </div>
                <div className="container p-4 w-1/3"></div>
            </div>
        </div>
    );
};
