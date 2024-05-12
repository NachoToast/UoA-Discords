import { beforeAll, describe, expect, test } from 'vitest';
import { CONFIG } from '../config/index.js';
import { ResponseData, getResponseData, stubApp } from '../tests/index.js';
import { rateLimitingMiddleware } from './rateLimitingMiddleware.js';

const rateLimitHeader = 'access-control-allow-origin';

describe.concurrent(rateLimitingMiddleware.name, () => {
    // Not Ratelimited yet.
    let responseNormalA: ResponseData;
    let responseNormalB: ResponseData;

    // Ratelimiting starts.
    let responseRateLimited: ResponseData;

    beforeAll(async () => {
        CONFIG.loadRateLimit(2);

        const app = stubApp({ preRouteMiddleware: [rateLimitingMiddleware] });

        const [response1, response2] = await Promise.all([
            app.get('/').send(),
            app.get('/').send(),
        ]);

        const response3 = await app.get('/').send();

        responseNormalA = getResponseData(response1, rateLimitHeader);
        responseNormalB = getResponseData(response2, rateLimitHeader);
        responseRateLimited = getResponseData(response3, rateLimitHeader);
    });

    test("does nothing when not limit isn't yet reached", () => {
        expect(responseNormalA.status).toBe(200);
        expect(responseNormalB.status).toBe(200);
    });

    test('starts rate limiting when limit is reached', () => {
        expect(responseRateLimited.status).toBe(429);
    });
});
