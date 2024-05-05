export const API_URL = import.meta.env.API_URL ?? 'http://localhost:3000';
export const DEFAULT_LIMIT = +(import.meta.env.DEFAULT_LIMIT ?? 36);
export const TOKEN_EXPIRATION_TIME =
    +(import.meta.env.TOKEN_EXPIRATION_DAYS ?? 30) * 1000 * 60 * 60 * 24;
export const TOKEN_REFRESH_THRESHOLD =
    +(import.meta.env.TOKEN_REFRESH_THRESHOLD_DAYS ?? 7) * 1000 * 60 * 60 * 24;

export const MAX_FILE_SIZE =
    +(import.meta.env.MAX_FILE_SIZE_MB ?? 5) * 1024 * 1024;
