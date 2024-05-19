import { ErrorRequestHandler, RequestHandler } from 'express';
import { Config } from './Config.js';

export type MiddlewareProvider = (
    config: Config,
) =>
    | RequestHandler
    | ErrorRequestHandler
    | RequestHandler[]
    | ErrorRequestHandler[];
