import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Post } from '@/api/models/post';
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import { getImageUrl } from '@/utils/getImageUrl';
import {
    BoxIcon,
    HeartIcon,
    ImageOff,
    LandPlotIcon,
    MapPinIcon,
    ReceiptIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { capitalize } from '@/utils/capitalize';
import { Button } from '@/components/ui/button';
import { CameraIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { useUserContext } from '@/context/user-context';
import { useSetFavorite } from '@/api/posts/favorite/use-set-favorite';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from '@tanstack/react-router';
import { formatPrice, formatPricePerMeter } from '@/lib/formatters';
import { useTranslation } from 'react-i18next';
import { useRestorePost } from '@/api/posts/restore/use-restore-post';

type Props = {
    displayMode?: 'status' | 'favorite';
    displayFormat?: 'list' | 'grid';
    buttonConfiguration?: 'edit' | 'restore' | 'view';
} & Post;

export const PostListItem = ({
    id,
    title,
    images,
    price,
    type,
    address,
    rooms,
    area,
    status,
    isFavorite,
    displayMode = 'favorite',
    displayFormat = 'list',
    buttonConfiguration = 'view',
}: Props) => {
    const { t } = useTranslation();
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const user = useUserContext();
    const navigate = useNavigate();
    const { mutateAsync: setFavoriteMutateAsync } = useSetFavorite({ id });
    const { mutateAsync: restorePostMutateAsync } = useRestorePost({ id });

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <Card
            className="focus-within:ring-1 focus-within:ring-primary m-1"
            id={`post-${id}`}
        >
            <div
                className={cn('flex ', displayFormat === 'grid' && 'flex-col')}
            >
                <div className="basis-2/5">
                    {images.length > 0 ? (
                        <Carousel
                            setApi={setApi}
                            className={cn(
                                'overflow-hidden h-full',
                                displayFormat === 'grid' && 'rounded-t-xl',
                                displayFormat === 'list' && 'rounded-l-xl',
                            )}
                        >
                            <CarouselContent className="h-full">
                                {images.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <img
                                            className="h-full object-cover"
                                            src={getImageUrl(image.url)}
                                            alt={title}
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
                                {t('# of #', { current, max: count })}
                            </Badge>
                        </Carousel>
                    ) : (
                        <div className="flex h-full w-full items-center justify-center border-r border-b aspect-[4/3]">
                            <ImageOff className="h-12 w-full text-muted-foreground" />
                        </div>
                    )}
                </div>

                <div className="flex-1 flex flex-col shrink">
                    <CardHeader className="pb-4">
                        <CardTitle className="justify-between flex w-full">
                            <div className="text-2xl font-semibold tracking-tight">
                                {formatPrice(price, type, t)}
                            </div>
                            {displayMode === 'status' ? (
                                <Badge
                                    className="max-h-6"
                                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                                    variant={status.toLowerCase() as any}
                                >
                                    {t(capitalize(status))}
                                </Badge>
                            ) : (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="[&_svg]:size-5"
                                    disabled={!user}
                                    onClick={() =>
                                        setFavoriteMutateAsync({
                                            favorite: !isFavorite,
                                        })
                                    }
                                >
                                    {isFavorite ? (
                                        <HeartFilledIcon />
                                    ) : (
                                        <HeartIcon />
                                    )}
                                </Button>
                            )}
                        </CardTitle>
                        <CardDescription className="text-foreground font-medium tracking-tight">
                            {title}
                        </CardDescription>
                        <CardDescription className="flex items-center gap-2 pt-2">
                            <MapPinIcon />
                            {address}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-4 flex-1 items-start">
                        <CardDescription className="flex items-center gap-2">
                            <BoxIcon />
                            {t('# Rooms', { count: rooms })}
                        </CardDescription>
                        <CardDescription className="flex items-center gap-2">
                            <ReceiptIcon />
                            {formatPricePerMeter(price, area)}
                        </CardDescription>
                        <CardDescription className="flex items-center gap-2">
                            <LandPlotIcon />
                            {`${area} m²`}
                        </CardDescription>
                    </CardContent>
                    <CardFooter className="flex w-full justify-end">
                        {buttonConfiguration === 'edit' && (
                            <div className="flex gap-2">
                                <Button
                                    id={`post-${id}-details`}
                                    variant="secondary"
                                    asChild
                                >
                                    <Link
                                        to="/posts/$postId"
                                        params={{
                                            postId: `${id}`,
                                        }}
                                    >
                                        {t('View details')}
                                    </Link>
                                </Button>
                                <Button asChild>
                                    <Link
                                        to="/posts/$postId/edit"
                                        params={{
                                            postId: `${id}`,
                                        }}
                                    >
                                        {t('Edit')}
                                    </Link>
                                </Button>
                            </div>
                        )}
                        {buttonConfiguration === 'restore' && (
                            <div className="flex gap-2">
                                <Button variant="secondary" asChild>
                                    <Link
                                        to="/posts/$postId"
                                        params={{
                                            postId: `${id}`,
                                        }}
                                    >
                                        {t('View details')}
                                    </Link>
                                </Button>
                                <Button
                                    id={`post-${id}-details`}
                                    onClick={async () => {
                                        await restorePostMutateAsync();
                                        await navigate({
                                            to: '/posts/$postId',
                                            params: {
                                                postId: `${id}`,
                                            },
                                        });
                                    }}
                                >
                                    {t('Restore')}
                                </Button>
                            </div>
                        )}
                        {buttonConfiguration === 'view' && (
                            <Button id={`post-${id}-details`} asChild>
                                <Link
                                    to="/posts/$postId"
                                    params={{
                                        postId: `${id}`,
                                    }}
                                >
                                    {t('View details')}
                                </Link>
                            </Button>
                        )}
                    </CardFooter>
                </div>
            </div>
        </Card>
    );
};
