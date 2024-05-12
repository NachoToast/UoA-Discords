import { ConfigError } from '../classes/ConfigError.js';

export let PROXY_COUNT: number;

export function loadProxyCount(override?: number): void {
    if (override === undefined) {
        const rawProxyCount = process.env['PROXY_COUNT'];

        if (rawProxyCount === undefined) {
            throw new ConfigError('PROXY_COUNT', 'is not defined');
        }

        PROXY_COUNT = Number(rawProxyCount);
    } else {
        PROXY_COUNT = override;
    }

    if (!Number.isInteger(PROXY_COUNT)) {
        throw new ConfigError('PROXY_COUNT', 'is not an integer');
    }

    if (PROXY_COUNT < 0) {
        throw new ConfigError(
            'PROXY_COUNT',
            'must be greater than or equal to 0',
        );
    }
}
