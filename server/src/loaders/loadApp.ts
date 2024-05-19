import express, { Express } from 'express';
import { Colour, Config } from '../types/index.js';

function startServer(app: Express, { port }: Config): void {
    const server = app.listen(port, () => {
        const addressData = server.address();

        if (addressData === null) {
            console.log(
                `Now listening on ${Colour.FgMagenta}an unknown address${Colour.Reset}`,
            );
        } else if (typeof addressData === 'string') {
            console.log(
                `Now listening on ${Colour.FgCyan}${addressData}${Colour.Reset}`,
            );
        } else {
            console.log(
                `Now listening on ${
                    Colour.FgCyan
                }http://${addressData.address.replace(
                    '::',
                    'localhost',
                )}:${addressData.port.toString()}${Colour.Reset}`,
            );
        }
    });
}

export function loadApp(config: Config): {
    app: Express;
    startApp: () => void;
} {
    const app = express();

    console.log(
        `Running in ${Colour.FgMagenta}${app.get('env') as string}${
            Colour.Reset
        } mode`,
    );

    if (config.proxyCount > 0) {
        app.set('trust proxy', config.proxyCount);

        console.log(
            `${Colour.FgMagenta}${config.proxyCount.toString()}${
                Colour.Reset
            } Prox${config.proxyCount !== 1 ? 'ies' : 'y'} configured`,
        );
    }

    return {
        app,
        startApp: (): void => {
            startServer(app, config);
        },
    };
}
