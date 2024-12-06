import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../helpers/query-keys';
import { MapboxEndpoints } from '../helpers/endpoints';

import { callApi } from '../helpers/call-api';
import { FetchError } from '../helpers/fetch-error';
import {
    MAPBOX_ACCESS_TOKEN,
    MAPBOX_BASE_URL,
    MAPBOX_SESSION_ID,
} from '@/config';

interface Params {
    search: string;
}

export interface SearchAddressSuggestion {
    name: string;
    mapbox_id: string;
    full_address: string;
    place_formatted: string;
}

interface SearchAddressResponse {
    suggestions: SearchAddressSuggestion[];
}

const SEATCH_TYPES = [
    'country',
    'region',
    'postcode',
    'district',
    'place',
    'city',
    'locality',
    'neighborhood',
    'street',
    'address',
];

export const useSearchAddress = ({ search }: Params) => {
    return useQuery<SearchAddressResponse, FetchError>({
        queryKey: [QueryKeys.RETRIEVE_ADDRESS, search],
        queryFn: async ({ signal }) => {
            return callApi(MapboxEndpoints.SUGGEST, {
                signal,
                baseUrl: MAPBOX_BASE_URL,
                query: {
                    q: search,
                    access_token: MAPBOX_ACCESS_TOKEN,
                    session_token: MAPBOX_SESSION_ID,
                    language: 'pl-PL',
                    types: SEATCH_TYPES.join(','),
                },
                credentials: 'omit',
            });
        },
        staleTime: Infinity,
        enabled: search.length > 2,
    });
};
