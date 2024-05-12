import express, { ErrorRequestHandler, RequestHandler } from 'express';
import request from 'supertest';

type MiddlewareProvider = () =>
    | RequestHandler
    | ErrorRequestHandler
    | RequestHandler[]
    | ErrorRequestHandler[];

interface StubAppConfig {
    preRouteMiddleware?: MiddlewareProvider[];
    postRouteMiddleware?: MiddlewareProvider[];
}

export function stubApp({
    preRouteMiddleware,
    postRouteMiddleware,
}: StubAppConfig = {}): ReturnType<typeof request> {
    const app = express();

    if (preRouteMiddleware !== undefined) {
        for (const middleware of preRouteMiddleware) {
            app.use(middleware());
        }
    }

    app.get('/', (_req, res) => res.sendStatus(200));

    if (postRouteMiddleware !== undefined) {
        for (const middleware of postRouteMiddleware) {
            app.use(middleware());
        }
    }

    return request(app);
}
