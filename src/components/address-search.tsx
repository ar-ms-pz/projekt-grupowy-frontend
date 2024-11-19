import { ChangeEvent, useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import {
    SearchAddressSuggestion,
    useSearchAddress,
} from '@/api/address/use-search-address';
import { debounce } from '@/utils/debounce';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PopoverContent, Popover } from './ui/popover';
import { Input } from './ui/input';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from './ui/button';
import { useRouter, useSearch } from '@tanstack/react-router';
import { CrossCircledIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useRetrieveAddress } from '@/api/address/use-retrive-address';

const STRINGS = {
    ADDRESS: 'Enter Address...',
    DISTANCE: 'Distance',
    ENTER_AT_LEAST_3_CHARACTERS: 'Please enter at least 3 characters',
};

const DISTANCE_STEPS = ['1', '5', '10', '15', '20', '30', '50', '100'] as const;

export const AddressSearch = () => {
    const [search, setSearch] = useState('');
    const [selectedValue, setSelectedValue] =
        useState<SearchAddressSuggestion>();
    const [isOpen, setIsOpen] = useState(false);
    const { data, isLoading } = useSearchAddress({ search });
    const { data: addressData, isFetching: isFetchingAddress } =
        useRetrieveAddress();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const { navigate } = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queryParams: Record<string, any> = useSearch({ from: '/search' });

    useEffect(() => {
        if (!isMounted) return;

        if (selectedValue) {
            navigate({
                to: '/search',
                search: {
                    ...queryParams,
                    mapboxId: selectedValue.mapbox_id,
                },
            });
        } else {
            delete queryParams.mapboxId;
            navigate({
                to: '/search',
                search: queryParams,
            });
        }
    }, [navigate, queryParams, selectedValue]);

    useEffect(() => {
        if (addressData && !isFetchingAddress) {
            setSelectedValue(addressData.properties);
        }
    }, [addressData, isFetchingAddress]);

    const [onSearch] = debounce(
        (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
        300,
    );

    const setDistance = (distance: string) => {
        navigate({
            to: '/search',
            search: {
                ...queryParams,
                distance,
            },
        });
    };

    return (
        <div className="p-4">
            <div className="flex gap-4 flex-1">
                {selectedValue ? (
                    <div className="w-full relative">
                        <Input
                            autoComplete="off"
                            placeholder={STRINGS.ADDRESS}
                            // {...field}
                            disabled
                            value={selectedValue.name}
                            className="pr-9"
                        />
                        <Button
                            onClick={() => setSelectedValue(undefined)}
                            className="absolute right-0 top-0 rounded-full"
                            size="icon"
                            variant="ghost"
                        >
                            <CrossCircledIcon
                                className="size-5"
                                width={20}
                                height={20}
                            />
                        </Button>
                    </div>
                ) : (
                    <Popover open={isOpen} onOpenChange={setIsOpen}>
                        <PopoverTrigger className="flex-1">
                            <div className="w-full relative">
                                <Input
                                    autoComplete="off"
                                    placeholder={STRINGS.ADDRESS}
                                    // {...field}
                                    onChange={onSearch}
                                    className="pr-9"
                                />
                                <div className="absolute right-0 top-0 p-2">
                                    <MagnifyingGlassIcon className="size-5" />
                                </div>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent
                            className={cn(
                                'w-[var(--radix-popover-trigger-width)] p-0',
                            )}
                            onOpenAutoFocus={(e) => e.preventDefault()}
                        >
                            {search.length < 3 && (
                                <div className="text-center p-2">
                                    {STRINGS.ENTER_AT_LEAST_3_CHARACTERS}
                                </div>
                            )}

                            {search.length > 2 && isLoading && (
                                <div className="flex justify-center p-2">
                                    <Loader2
                                        size={24}
                                        className="animate-spin"
                                    />
                                </div>
                            )}
                            {search.length > 2 &&
                                !isLoading &&
                                data?.suggestions.map((suggestion) => (
                                    <Button
                                        variant="ghost"
                                        key={suggestion.mapbox_id}
                                        value={suggestion.mapbox_id}
                                        className="w-full h-auto max-w-full rounded-none"
                                        onClick={() => {
                                            setSelectedValue(suggestion);
                                            setSearch('');
                                            setIsOpen(false);
                                        }}
                                    >
                                        <div className="flex items-start flex-col w-[calc(100%-3.5rem)] flex-1">
                                            <div className="truncate w-full text-left">
                                                {suggestion.name}
                                            </div>
                                            <div className="truncate w-full text-left font-light">
                                                {suggestion.full_address ??
                                                    suggestion.place_formatted}
                                            </div>
                                        </div>
                                    </Button>
                                ))}
                        </PopoverContent>
                    </Popover>
                )}

                <Select
                    onValueChange={setDistance}
                    defaultValue={
                        queryParams.distance ?? `${DISTANCE_STEPS[0]}`
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={STRINGS.DISTANCE} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {DISTANCE_STEPS.map((step) => (
                                <SelectItem key={step} value={`${step}`}>
                                    +{step}km
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
