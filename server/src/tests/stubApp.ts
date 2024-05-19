import express from 'express';
import request from 'supertest';
import { Config, MiddlewareProvider } from '../types/index.js';
import { mockedConfig } from './mockedConfig.js';

interface StubAppProps {
    config?: Partial<Config>;
    preRouteMiddleware?: MiddlewareProvider[];
    postRouteMiddleware?: MiddlewareProvider[];
}

export function stubApp({
    config,
    preRouteMiddleware,
    postRouteMiddleware,
}: StubAppProps = {}): ReturnType<typeof request> {
    const app = express();

    const fullConfig: Config = { ...mockedConfig, ...config };

    if (preRouteMiddleware !== undefined) {
        for (const middleware of preRouteMiddleware) {
            app.use(middleware(fullConfig));
        }
    }

    app.get('/', (_req, res) => res.sendStatus(200));

    if (postRouteMiddleware !== undefined) {
        for (const middleware of postRouteMiddleware) {
            app.use(middleware(fullConfig));
        }
    }

    return request(app);
}
