import { QueryKey, useSuspenseQuery } from '@tanstack/react-query';
import { QueryKeys } from '../helpers/query-keys';
import { DEFAULT_LIMIT } from '../../config';
import { Endpoints } from '../helpers/endpoints';
import { PaginatedResponse } from '../models/response';
import { Post } from '../models/post';
import { callApi } from '../helpers/call-api';
import { FetchError } from '../helpers/fetch-error';
import { useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import { getFiltersSearchParams } from '@/lib/get-search-url-params';
import { useRetrieveAddress } from '../address/use-retrive-address';

export const usePosts = () => {
    const { data: address } = useRetrieveAddress();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: Record<string, any> = useSearch({
        from: '/search',
    });

    const parsedParams = useMemo(() => {
        const { distance: rawDistance, ...queryParams } =
            getFiltersSearchParams(params);

        const { latitude, longitude } = address?.geometry.coordinates
            ? {
                  latitude: address.geometry.coordinates[1],
                  longitude: address.geometry.coordinates[0],
              }
            : {};

        const distance = rawDistance ? Number(rawDistance) * 1000 : undefined;

        const shouldUseDistance =
            !!params.mapboxId && distance && latitude && longitude;

        return {
            ...queryParams,
            distance: shouldUseDistance ? distance : undefined,
            longitude: shouldUseDistance ? longitude : undefined,
            latitude: shouldUseDistance ? latitude : undefined,
        };
    }, [params, address]);

    const paramsPage = (params as { page: unknown }).page;

    const page =
        !isNaN(Number(paramsPage)) &&
        Number(paramsPage) > 0 &&
        Number(paramsPage) % 1 === 0
            ? Number(paramsPage)
            : 1;

    return useSuspenseQuery<
        PaginatedResponse<Post>,
        FetchError,
        PaginatedResponse<Post>,
        QueryKey
    >({
        queryKey: [QueryKeys.POSTS, params.mapboxId, parsedParams, page],
        queryFn: async ({ signal }) => {
            return callApi(Endpoints.POSTS, {
                signal,
                query: {
                    offset: DEFAULT_LIMIT * (page - 1),
                    limit: DEFAULT_LIMIT,
                    ...parsedParams,
                },
            });
        },
    });
};
