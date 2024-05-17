import express from 'express';
import { join } from 'path';
import swaggerUi from 'swagger-ui-express';
import { CONFIG } from '../config/index.js';
import apiSpec from '../openapi.json';

export function loadApiSpec(): void {
    CONFIG.app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(apiSpec, { customSiteTitle: 'UoA Discords API' }),
    );

    CONFIG.app.use(
        '/spec',
        express.static(join(import.meta.dirname, '../', 'openapi.json')),
    );
}
