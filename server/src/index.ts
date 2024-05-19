import {
    loadApiSpec,
    loadApp,
    loadConfig,
    loadMiddleware,
    loadRoutes,
} from './loaders/index.js';

process.on('uncaughtException', (error) => {
    console.log('Uncaught exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (error, promise) => {
    console.log('Unhandled rejection:', promise);
    console.log('Exception:', error);
    process.exit(1);
});

const config = loadConfig();
const { app, startApp } = loadApp(config);

loadApiSpec(app);
loadMiddleware(app, config);
loadRoutes(app);

startApp();
