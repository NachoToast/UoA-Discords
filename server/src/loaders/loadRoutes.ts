import { Express } from 'express';
import { getIp, getRoot } from '../routes/miscellaneous/index.js';

export function loadRoutes(app: Express): void {
    app.get('/', getRoot);

    app.get('/ip', getIp);
}
