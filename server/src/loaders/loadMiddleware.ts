import express, { Express } from 'express';
import { CONFIG } from '../config/index.js';
import { corsMiddleware } from '../middleware/corsMiddleware.js';
import { rateLimitingMiddleware } from '../middleware/rateLimitingMiddleware.js';

export function loadMiddleware(app: Express): void {
    app.use(express.json());
    app.use(corsMiddleware());

    if (CONFIG.RATE_LIMIT > 0) {
        app.use(rateLimitingMiddleware());
    }
}
