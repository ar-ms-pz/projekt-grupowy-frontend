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
import { BoxIcon, LandPlotIcon, MapPinIcon, ReceiptIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { capitalize } from '@/utils/capitalize';
import { Button } from '@/components/ui/button';
import { CameraIcon } from '@radix-ui/react-icons';

const STRINGS = {
    PER_MONTH: 'per month',
    ROOM: 'room',
    ROOMS: 'rooms',
    VIEW_DETAILS: 'View details',
    OF: 'of',
};

const formatPrice = (price: number, type: 'RENTAL' | 'SALE') => {
    const formattedPrice = price.toLocaleString('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        maximumFractionDigits: 0,
    });

    if (type === 'RENTAL') {
        return `${formattedPrice} ${STRINGS.PER_MONTH}`;
    }

    return formattedPrice;
};

const formatPricePerMeter = (price: number, area: number) => {
    const pricePerMeter = price / area;

    return `${pricePerMeter.toLocaleString('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        maximumFractionDigits: 0,
    })}/m²`;
};

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
}: Post) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

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
        <Card>
            <div className="flex">
                <div className="basis-2/5">
                    <Carousel
                        setApi={setApi}
                        className=" rounded-l-xl overflow-hidden h-full"
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
                            {current} {STRINGS.OF} {count}
                        </Badge>
                    </Carousel>
                </div>

                <div className="flex-1">
                    <CardHeader className="pb-4">
                        <CardTitle className="justify-between flex w-full">
                            <div className="text-2xl font-semibold tracking-tight">
                                {formatPrice(price, type)}
                            </div>
                            <Badge
                                className="max-h-6"
                                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                                variant={status.toLowerCase() as any}
                            >
                                {capitalize(status)}
                            </Badge>
                        </CardTitle>
                        <CardDescription className="text-foreground font-medium tracking-tight">
                            {title}
                        </CardDescription>
                        <CardDescription className="flex items-center gap-2 pt-2">
                            <MapPinIcon />
                            {address}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                        <CardDescription className="flex items-center gap-2">
                            <BoxIcon />
                            {`${rooms} ${rooms === 1 ? STRINGS.ROOM : STRINGS.ROOMS}`}
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
                        <Button id={`post-${id}-details`}>
                            {STRINGS.VIEW_DETAILS}
                        </Button>
                    </CardFooter>
                </div>
            </div>
        </Card>
    );
};
