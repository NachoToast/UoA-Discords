import rateLimit from 'express-rate-limit';
import { MiddlewareProvider } from '../types/index.js';

/**
 * Limits number of requests a user can make to the API in a given time window.
 */
export const rateLimitingMiddleware: MiddlewareProvider = ({
    rateLimit: limit,
}) => {
    return rateLimit({
        windowMs: 60 * 1_000, // 1 minute window
        limit,
        standardHeaders: 'draft-7',
        legacyHeaders: false,
    });
};
