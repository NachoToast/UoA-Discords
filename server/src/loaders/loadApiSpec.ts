import express, { Express } from 'express';
import { readFileSync } from 'fs';
import swaggerUi from 'swagger-ui-express';

/** Registers the `/api-docs` and `/spec` routes for the server. */
export function loadApiSpec(app: Express): void {
    // ESM JSON imports are experimental, so for now we'll use this method to
    // import the API spec.
    const apiSpec = JSON.parse(
        readFileSync('openapi.json', 'utf-8'),
    ) as swaggerUi.JsonObject;

    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(apiSpec, { customSiteTitle: 'UoA Discords API' }),
    );

    app.use('/spec', express.static('openapi.json'));
}
