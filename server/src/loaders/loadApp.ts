import express, { Express } from 'express';
import { CONFIG } from '../config/index.js';
import { Colours } from '../types/Colours.js';

export function startServer(app: Express): void {
    const server = app.listen(CONFIG.PORT, () => {
        const addressData = server.address();

        if (addressData === null) {
            console.log(
                `Now listening on ${Colours.FgMagenta}an unknown address${Colours.Reset}`,
            );
        } else if (typeof addressData === 'string') {
            console.log(
                `Now listening on ${Colours.FgCyan}${addressData}${Colours.Reset}`,
            );
        } else {
            console.log(
                `Now listening on ${
                    Colours.FgCyan
                }http://${addressData.address.replace(
                    '::',
                    'localhost',
                )}:${addressData.port.toString()}${Colours.Reset}`,
            );
        }
    });
}

export function loadApp(): Express {
    const app = express();

    console.log(
        `Running in ${Colours.FgMagenta}${app.get('env') as string}${
            Colours.Reset
        } mode`,
    );

    if (CONFIG.PROXY_COUNT > 0) {
        app.set('trust proxy', CONFIG.PROXY_COUNT);

        console.log(
            `${Colours.FgMagenta}${CONFIG.PROXY_COUNT.toString()}${
                Colours.Reset
            } Prox${CONFIG.PROXY_COUNT !== 1 ? 'ies' : 'y'} configured`,
        );
    }

    return app;
}
