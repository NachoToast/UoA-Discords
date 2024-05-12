import { ConfigError } from '../classes/ConfigError.js';
import { CONFIG } from '../config/index.js';

export function loadConfig(): void {
    try {
        CONFIG.loadPort();
        CONFIG.loadClientUrls();
    } catch (error) {
        if (error instanceof ConfigError) {
            console.log(error.message);
            process.exit(1);
        }

        throw error;
    }
}
