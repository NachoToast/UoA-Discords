import { ConfigError } from '../classes/ConfigError.js';
import { Colours } from '../types/Colours.js';

export let CLIENT_URLS: Set<string>;

function isValidUrl(url: string): boolean {
    if (url === '*') return true;

    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export function loadClientUrls(override?: Set<string>): void {
    if (override === undefined) {
        const rawClientUrls = process.env['CLIENT_URLS'];

        if (rawClientUrls === undefined) {
            throw new ConfigError('CLIENT_URLS', 'is not defined');
        }

        CLIENT_URLS = new Set(
            rawClientUrls.split(',').filter((e) => e.length > 0),
        );
    } else {
        CLIENT_URLS = override;
    }

    for (const url of CLIENT_URLS) {
        if (!isValidUrl(url)) {
            throw new ConfigError(
                'CLIENT_URLS',
                `contains an valid URL (${Colours.FgMagenta}${url}${Colours.Reset})`,
            );
        }
    }

    if (CLIENT_URLS.has('*') && CLIENT_URLS.size > 1) {
        ConfigError.warn(
            'CLIENT_URLS',
            'doesn\'t need other URLS since the wildcard ("*") is present',
        );
    }
}
