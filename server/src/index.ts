import {
    loadApiSpec,
    loadApp,
    loadConfig,
    loadMiddleware,
    loadRoutes,
    startServer,
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

loadConfig();
loadApp();
loadApiSpec();
loadMiddleware();
loadRoutes();

startServer();
