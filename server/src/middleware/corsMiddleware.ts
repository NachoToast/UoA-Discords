import cors, { CorsOptions } from 'cors';
import { CorsError } from '../errors/index.js';
import { Config, MiddlewareProvider } from '../types/index.js';

export function makeOriginFunction(
    clientUrls: Config['clientUrls'],
): CorsOptions['origin'] {
    if (clientUrls.has('*')) return '*';

    return (origin, callback) => {
        // Origin is undefined on non-browser requests (e.g. Insomnia).
        if (origin === undefined || clientUrls.has(origin)) {
            callback(null, true);
        } else {
            callback(new CorsError());
        }
    };
}

export const corsMiddleware: MiddlewareProvider = ({ clientUrls }) => {
    return cors({
        origin: makeOriginFunction(clientUrls),
        exposedHeaders: ['RateLimit', 'RateLimit-Policy'],
    });
};
