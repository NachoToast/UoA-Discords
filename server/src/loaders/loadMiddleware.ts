import express, { Express } from 'express';
import { corsMiddleware } from '../middleware/corsMiddleware.js';

export function loadMiddleware(app: Express): void {
    app.use(express.json());
    app.use(corsMiddleware());
}
