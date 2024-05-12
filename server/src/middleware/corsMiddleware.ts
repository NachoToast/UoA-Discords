import cors, { CorsOptions } from 'cors';
import { RequestHandler } from 'express';
import { CONFIG } from '../config/index.js';
import { CorsError } from '../errors/CorsError.js';

export function makeOriginFunction(): CorsOptions['origin'] {
    if (CONFIG.CLIENT_URLS.has('*')) return '*';

    return (origin, callback) => {
        // Origin is undefined on non-browser requests (e.g. Insomnia).
        if (origin === undefined || CONFIG.CLIENT_URLS.has(origin)) {
            callback(null, true);
        } else {
            callback(new CorsError());
        }
    };
}

export function corsMiddleware(): RequestHandler {
    return cors({
        origin: makeOriginFunction(),
        exposedHeaders: [
            'RateLimit-Limit',
            'RateLimit-Remaining',
            'RateLimit-Reset',
            'Retry-After',
        ],
    });
}
