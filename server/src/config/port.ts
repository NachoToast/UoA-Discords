import { ConfigError } from '../classes/ConfigError.js';

export let PORT: number;

export function loadPort(override?: number): void {
    if (override === undefined) {
        const rawPort = process.env['PORT'];

        if (rawPort === undefined) {
            throw new ConfigError('PORT', 'is not defined');
        }

        PORT = Number(rawPort);
    } else {
        PORT = override;
    }

    if (!Number.isInteger(PORT)) {
        throw new ConfigError('PORT', 'is not an integer');
    }

    if (PORT < 0 || PORT > 65535) {
        throw new ConfigError(
            'PORT',
            'must be between 0 and 65535 (inclusive)',
        );
    }
}
