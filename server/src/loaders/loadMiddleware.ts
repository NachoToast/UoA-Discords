import express from 'express';
import { CONFIG } from '../config/index.js';
import { corsMiddleware } from '../middleware/corsMiddleware.js';
import { rateLimitingMiddleware } from '../middleware/rateLimitingMiddleware.js';

export function loadMiddleware(): void {
    CONFIG.app.use(express.json());
    CONFIG.app.use(corsMiddleware());

    if (CONFIG.RATE_LIMIT > 0) {
        CONFIG.app.use(rateLimitingMiddleware());
    }
}
