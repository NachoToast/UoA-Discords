export interface Config {
    port: number;
    rateLimit: number;
    proxyCount: number;
    clientUrls: Set<string>;

    postgres: {
        host: string;
        user: string;
        password: string;
        port: number;
    };
}
