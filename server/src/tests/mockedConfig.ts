import { Config } from '../types/index.js';

export const mockedConfig: Config = {
    port: 5000,
    rateLimit: 30,
    proxyCount: 0,
    clientUrls: new Set(['*']),

    postgres: {
        host: 'localhost',
        user: 'postgres',
        password: 'password',
        port: 5432,
    },
};
