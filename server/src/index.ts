import {
    loadApp,
    loadConfig,
    loadMiddleware,
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

const app = loadApp();

loadMiddleware(app);

startServer(app);
