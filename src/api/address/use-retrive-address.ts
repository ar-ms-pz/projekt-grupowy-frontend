import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../query-keys';
import { MapboxEndpoints } from '../endpoints';

import { callApi } from '../call-api';
import { FetchError } from '../fetch-error';
import {
    MAPBOX_ACCESS_TOKEN,
    MAPBOX_BASE_URL,
    MAPBOX_SESSION_ID,
} from '@/config';
import { useSearch } from '@tanstack/react-router';
import { SearchAddressSuggestion } from './use-search-address';

interface SearchAddressResponse {
    geometry: {
        coordinates: [number, number];
        type: string;
    };
    properties: SearchAddressSuggestion;
}

export const useRetrieveAddress = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { mapboxId }: Record<string, any> = useSearch({
        from: '/search',
    });
    return useQuery<SearchAddressResponse, FetchError>({
        queryKey: [QueryKeys.ADDRESS, mapboxId],
        queryFn: async ({ signal }) => {
            const response = await callApi(MapboxEndpoints.RETRIEVE, {
                signal,
                baseUrl: MAPBOX_BASE_URL,
                query: {
                    access_token: MAPBOX_ACCESS_TOKEN,
                    session_token: MAPBOX_SESSION_ID,
                    language: 'pl-PL',
                },
                params: {
                    id: mapboxId,
                },
                credentials: 'omit',
            });

            if (response.features[0]?.geometry.type !== 'Point') {
                return null;
            }

            return response.features[0];
        },
        staleTime: Infinity,
        enabled: !!mapboxId,
    });
};
