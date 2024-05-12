import { RequestHandler } from 'express';
import rateLimit from 'express-rate-limit';
import { CONFIG } from '../config/index.js';

/** Limits number of requests a user can make to the API in a given time window. */
export function rateLimitingMiddleware(): RequestHandler {
    return rateLimit({
        windowMs: 60 * 1_000, // 1 minute window
        limit: CONFIG.RATE_LIMIT,
        standardHeaders: 'draft-7',
        legacyHeaders: false,
    });
}
