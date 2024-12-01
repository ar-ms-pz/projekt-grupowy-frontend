import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel } from './ui/form';
import { useForm } from 'react-hook-form';
import { NumberInput } from './ui/number-input';
import { Button } from './ui/button';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useEffect, useMemo } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './ui/accordion';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { getFiltersSearchParams } from '@/lib/get-search-url-params';

const STRINGS = {
    TYPE: 'Type',
    SELECT_TYPE: 'Select post type',
    RENTAL: 'Rental',
    SALE: 'Sale',
    MIN: 'Min',
    MAX: 'Max',
    PLN: 'PLN',
    M2: 'm²',
    NAME_OR_ADDRESS: 'Name or address',
    SEARCH: 'Search',
    FILTER: 'More filters',
    PRICE: 'Price',
    AREA: 'Area',
    CLEAR: 'Clear',
    ROOMS: 'Rooms',
};

const formSchema = z
    .object({
        type: z.enum(['SALE', 'RENTAL'], {
            message: 'Type is required.',
        }),
        minArea: z
            .number({
                coerce: true,
            })
            .min(0, {
                message: 'Minimum area must be a positive number.',
            })
            .optional(),
        maxArea: z
            .number({
                coerce: true,
            })
            .min(0, {
                message: 'Maximum area must be a positive number.',
            })
            .optional(),

        minPrice: z
            .number({
                coerce: true,
            })
            .min(0, {
                message: 'Minimum price must be a positive number.',
            })
            .optional(),
        maxPrice: z
            .number({
                coerce: true,
            })
            .min(0, {
                message: 'Maximum price must be a positive number.',
            })
            .optional(),
        minRooms: z
            .number({
                coerce: true,
            })
            .min(0, {
                message: 'Minimum rooms must be a positive number.',
            })
            .optional(),
        maxRooms: z
            .number({
                coerce: true,
            })
            .min(0, {
                message: 'Maximum rooms must be a positive number.',
            })
            .optional(),
        search: z.string().optional(),
    })
    .refine(
        (data) =>
            !data.minArea || !data.maxArea || data.minArea <= data.maxArea,
        {
            message: 'Minimum area must be less than or equal to maximum area.',
            path: ['minArea'],
        },
    )
    .refine(
        (data) =>
            !data.minPrice || !data.maxPrice || data.minPrice <= data.maxPrice,
        {
            message:
                'Minimum price must be less than or equal to maximum price.',
        },
    );

export type PostSearchFormModel = z.infer<typeof formSchema>;

export const FilterPanel = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: Record<string, any> = useSearch({
        from: '/search',
    });

    const parsedParams = useMemo(
        () => getFiltersSearchParams(params),
        [params],
    );

    const form = useForm<PostSearchFormModel>({
        resolver: zodResolver(formSchema),
        defaultValues: parsedParams,
    });

    const onSubmit = (data: PostSearchFormModel) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newSearch: Record<string, any> = data;
        !newSearch.search && delete newSearch.search;

        if (params.mapboxId) newSearch.mapboxId = params.mapboxId;
        if (params.distance) newSearch.distance = params.distance;

        navigate({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            search: newSearch as any,
        });
    };

    const onClear = async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newSearch: Record<string, any> = {};

        if (params.mapboxId) newSearch.mapboxId = params.mapboxId;
        if (params.distance) newSearch.distance = params.distance;

        await navigate({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            search: newSearch as any,
        });

        form.reset({
            type: 'SALE',
        });
    };

    const type = form.watch('type');

    const priceStepper = type === 'RENTAL' ? 250 : 10000;

    useEffect(() => {
        form.resetField('minPrice');
        form.resetField('maxPrice');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline">
                    <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {STRINGS.FILTER}
                    </h1>
                </AccordionTrigger>
                <AccordionContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4 pt-4 px-2"
                        >
                            <div className="flex flex-col gap-4 items-center w-full sm:flex-row">
                                <div className="flex gap-2 flex-col w-full sm:w-auto">
                                    <FormLabel>{STRINGS.TYPE}</FormLabel>
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    autoComplete="off"
                                                >
                                                    <SelectTrigger className="sm:w-[180px]">
                                                        <SelectValue
                                                            placeholder={
                                                                STRINGS.SELECT_TYPE
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="SALE">
                                                                {STRINGS.SALE}
                                                            </SelectItem>
                                                            <SelectItem value="RENTAL">
                                                                {STRINGS.RENTAL}
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col gap-2 flex-1 w-full sm:w-auto">
                                    <FormLabel>{STRINGS.PRICE}</FormLabel>
                                    <div className="flex gap-4">
                                        <FormField
                                            control={form.control}
                                            name="minPrice"
                                            render={({
                                                field: { onChange, ...field },
                                            }) => (
                                                <FormItem className="flex-1">
                                                    <NumberInput
                                                        min={0}
                                                        unit={STRINGS.PLN}
                                                        placeholder={
                                                            STRINGS.MIN
                                                        }
                                                        stepper={priceStepper}
                                                        autoComplete="off"
                                                        onValueChange={onChange}
                                                        {...field}
                                                    />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="maxPrice"
                                            render={({
                                                field: { onChange, ...field },
                                            }) => (
                                                <FormItem className="flex-1">
                                                    <NumberInput
                                                        min={0}
                                                        unit={STRINGS.PLN}
                                                        stepper={priceStepper}
                                                        placeholder={
                                                            STRINGS.MAX
                                                        }
                                                        autoComplete="off"
                                                        onValueChange={onChange}
                                                        {...field}
                                                    />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 flex-1 sm:flex-row">
                                <div className="flex flex-col gap-2 flex-1">
                                    <FormLabel>{STRINGS.AREA}</FormLabel>
                                    <div className="flex gap-4">
                                        <FormField
                                            control={form.control}
                                            name="minArea"
                                            render={({
                                                field: { onChange, ...field },
                                            }) => (
                                                <FormItem className="flex-1">
                                                    <NumberInput
                                                        min={0}
                                                        unit={STRINGS.M2}
                                                        placeholder={
                                                            STRINGS.MIN
                                                        }
                                                        stepper={5}
                                                        autoComplete="off"
                                                        onValueChange={onChange}
                                                        {...field}
                                                    />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="maxArea"
                                            render={({
                                                field: { onChange, ...field },
                                            }) => (
                                                <FormItem className="flex-1">
                                                    <NumberInput
                                                        min={0}
                                                        unit={STRINGS.M2}
                                                        placeholder={
                                                            STRINGS.MIN
                                                        }
                                                        stepper={5}
                                                        autoComplete="off"
                                                        onValueChange={onChange}
                                                        {...field}
                                                    />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <FormLabel>{STRINGS.ROOMS}</FormLabel>
                                    <div className="flex gap-4">
                                        <FormField
                                            control={form.control}
                                            name="minRooms"
                                            render={({
                                                field: { onChange, ...field },
                                            }) => (
                                                <FormItem className="flex-1">
                                                    <NumberInput
                                                        min={0}
                                                        placeholder={
                                                            STRINGS.MIN
                                                        }
                                                        autoComplete="off"
                                                        onValueChange={onChange}
                                                        {...field}
                                                    />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="maxRooms"
                                            render={({
                                                field: { onChange, ...field },
                                            }) => (
                                                <FormItem className="flex-1">
                                                    <NumberInput
                                                        min={0}
                                                        placeholder={
                                                            STRINGS.MAX
                                                        }
                                                        autoComplete="off"
                                                        onValueChange={onChange}
                                                        {...field}
                                                    />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="ml-auto flex items-center gap-4">
                                <Button
                                    type="button"
                                    className="w-fit"
                                    variant="secondary"
                                    onClick={onClear}
                                >
                                    {STRINGS.CLEAR}
                                </Button>

                                <Button type="submit" className="w-fit">
                                    <MagnifyingGlassIcon className="size-5" />
                                    {STRINGS.SEARCH}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
