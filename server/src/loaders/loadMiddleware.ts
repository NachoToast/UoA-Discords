import express, { Express } from 'express';
import { corsMiddleware, rateLimitingMiddleware } from '../middleware/index.js';
import { Config } from '../types/index.js';

export function loadMiddleware(app: Express, config: Config): void {
    app.use(express.json());
    app.use(corsMiddleware(config));

    if (config.rateLimit > 0) {
        app.use(rateLimitingMiddleware(config));
    }
}
