import express from 'express';
import { readFileSync } from 'fs';
import swaggerUi from 'swagger-ui-express';
import { CONFIG } from '../config/index.js';

export function loadApiSpec(): void {
    // ESM JSON imports are experimental, so for now we'll use this method to
    // import the API spec.
    const apiSpec = JSON.parse(
        readFileSync('openapi.json', 'utf-8'),
    ) as swaggerUi.JsonObject;

    CONFIG.app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(apiSpec, { customSiteTitle: 'UoA Discords API' }),
    );

    CONFIG.app.use('/spec', express.static('openapi.json'));
}
