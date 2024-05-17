import { CONFIG } from '../config/index.js';
import { getIp, getRoot } from '../routes/miscellaneous/index.js';

export function loadRoutes(): void {
    CONFIG.app.get('/', getRoot);

    CONFIG.app.get('/ip', getIp);
}
