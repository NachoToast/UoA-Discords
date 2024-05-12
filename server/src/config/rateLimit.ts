import { ConfigError } from '../classes/ConfigError.js';

export let RATE_LIMIT: number;

export function loadRateLimit(override?: number): void {
    if (override === undefined) {
        const rawAmount = process.env['RATE_LIMIT'];

        if (rawAmount === undefined) {
            throw new ConfigError('RATE_LIMIT', 'is not defined');
        }

        RATE_LIMIT = Number(rawAmount);
    } else {
        RATE_LIMIT = override;
    }

    if (!Number.isInteger(RATE_LIMIT)) {
        throw new ConfigError('RATE_LIMIT', 'is not an integer');
    }

    if (RATE_LIMIT < 0) {
        throw new ConfigError(
            'RATE_LIMIT',
            'must be greater than or equal to 0',
        );
    }
}
