import { API_URL } from '../../config';
import type { Endpoint } from './endpoints';
import { ErrorCodes } from './error-codes';
import { FetchError } from './fetch-error';

interface RequestOptions {
    body?:
        | {
              [key: string]: unknown;
          }
        | FormData;
    headers?: {
        [key: string]: string;
    };
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    params?: {
        [key: string]: string | undefined;
    };
    query?: {
        [key: string]: string | string[] | number | undefined;
    };
    signal?: AbortSignal;
    token?: string;
    baseUrl?: string;
    credentials?: 'include' | 'omit';
}

const HEADERS_CONFIG = {
    Accept: 'application/json',
};

export const callApi = async (
    endpoint: Endpoint,
    {
        body,
        headers,
        method = 'GET',
        params,
        query,
        signal,
        baseUrl = API_URL,
        credentials = 'include',
    }: RequestOptions,
) => {
    if (method === 'GET' && body) {
        throw new Error('GET requests cannot have a body');
    }

    const reqHeaders = {
        ...HEADERS_CONFIG,
        ...(headers ?? {}),
        ...(!(body instanceof FormData)
            ? {
                  'Content-Type': 'application/json',
              }
            : {}),
    };

    const queryEntries = query ? Object.entries(query) : [];
    const paramsEntries = params ? Object.entries(params) : [];

    // Build query string
    const queryString = queryEntries.reduce((prev, curr, i) => {
        if (curr[1] == null) {
            return prev;
        }
        // Array are processed as multiple occurrences of the same key
        // e.g. [value1, value2] => ?key=value1&key=value2
        const queryChunk = Array.isArray(curr[1])
            ? curr[1].reduce((prevChunk, currChunk, iChunk) => {
                  return `${prevChunk}${iChunk !== 0 ? '&' : ''}${
                      curr[0]
                  }=${currChunk}`;
              }, '')
            : `${curr[0]}=${curr[1]}`;

        return `${prev}${i !== 0 ? '&' : ''}${queryChunk}`;
    }, '?');

    // Inject params
    const parsedPathname =
        paramsEntries.length !== 0
            ? paramsEntries.reduce(
                  (prev, curr) =>
                      curr[1] ? prev.replace(`[${curr[0]}]`, curr[1]) : prev,
                  endpoint as string,
              )
            : endpoint;

    const url = encodeURI(
        `${baseUrl}${parsedPathname}${
            queryString && queryString !== '?' ? queryString : ''
        }`,
    );

    try {
        const response = await fetch(url, {
            body:
                body && !(body instanceof FormData)
                    ? JSON.stringify(body)
                    : body,
            headers: reqHeaders,
            credentials,
            signal,
            method,
        });

        const json = await response.json();
        if (!response.ok) {
            throw new FetchError(
                response.statusText,
                response.status,
                json.errors,
            );
        }

        return json;
    } catch (e) {
        if (e instanceof FetchError) throw e;

        throw new FetchError('Network error', 0, [
            {
                message: e instanceof Error ? e.message : 'Fetch Error',
                code: ErrorCodes.FETCH_ERROR,
                path: [],
            },
        ]);
    }
};
