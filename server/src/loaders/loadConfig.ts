import { Colour, Config } from '../types/index.js';

/**
 * Reads a value from `process.env`, transforms it using the given
 * {@link transformFn}, and then validates it using the given {@link validatorFns}.
 *
 * @throws Throws a {@link ConfigError} if the value is not defined or fails
 *  validation.
 */
function readFromEnv<T>(
    key: string,
    transformFn: (x: string) => T,
    ...validatorFns: ((x: T, warn: (warning: string) => void) => void)[]
): T {
    const envFile = Colour.FgMagenta + '.env' + Colour.Reset;
    const keyButRed = Colour.FgRed + key + Colour.Reset;

    const rawValue = process.env[key];

    try {
        if (rawValue === undefined) {
            throw new Error('is not defined');
        }

        const value = transformFn(rawValue);

        for (const validatorFn of validatorFns) {
            validatorFn(value, (warning) => {
                console.log(
                    `Misconfiguration in ${envFile}: ${keyButRed} ${warning}.`,
                );
            });
        }

        return value;
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error in ${envFile}: ${keyButRed} ${error.message}.`);
            process.exit(1);
        }

        throw error;
    }
}

function mustBeInteger(x: number): void {
    if (!Number.isInteger(x)) {
        throw new Error('is not an integer');
    }
}

function mustBeValidPort(port: number): void {
    mustBeInteger(port);

    if (port < 0 || port > 65535) {
        throw new Error('must be between 0 and 65535 (inclusive)');
    }
}

function mustBeValidUrl(url: string): void {
    try {
        new URL(url);
    } catch {
        throw new Error('is not a valid URL');
    }
}

function mustHaveItems<T = unknown>(x: T[] | Set<T>): void {
    if (Array.isArray(x)) {
        if (x.length === 0) {
            throw new Error('cannot be empty');
        }
    } else if (x.size === 0) {
        throw new Error('cannot be empty');
    }
}

function mustBeValidUrlSet(
    urlSet: Set<string>,
    warn: (warning: string) => void,
): void {
    for (const url of urlSet) {
        if (url === '*') continue;

        try {
            mustBeValidUrl(url);
        } catch {
            throw new Error(
                `contains an invalid URL (${Colour.FgMagenta}${url}${Colour.Reset})`,
            );
        }
    }

    if (urlSet.has('*') && urlSet.size > 1) {
        warn('doesn\'t need other URLS since the wildcard ("*") is present');
    }
}

function mustBeGreaterThanOrEqualToZero(x: number): void {
    if (x < 0) {
        throw new Error('must be greater than or equal to 0');
    }
}

export function loadConfig(): Config {
    return {
        port: readFromEnv('PORT', Number, mustBeValidPort),

        rateLimit: readFromEnv(
            'RATE_LIMIT',
            Number,
            mustBeInteger,
            mustBeGreaterThanOrEqualToZero,
        ),

        proxyCount: readFromEnv(
            'PROXY_COUNT',
            Number,
            mustBeInteger,
            mustBeGreaterThanOrEqualToZero,
        ),

        clientUrls: readFromEnv(
            'CLIENT_URLS',
            (x) => new Set(x.split(',').filter((e) => e.length > 0)),
            mustHaveItems,
            mustBeValidUrlSet,
        ),

        postgres: {
            host: readFromEnv('POSTGRES_HOST', String),
            user: readFromEnv('POSTGRES_USER', String),
            password: readFromEnv('POSTGRES_PASSWORD', String),
            port: readFromEnv('POSTGRES_PORT', Number, mustBeValidPort),
        },
    };
}
