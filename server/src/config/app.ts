import { Express } from 'express';

// Unlike other config files in this directory, this "config" value does not
// get read from process.env, its only here for easy global access like other
// config values are.

export let app: Express;

export function setApp(newApp: Express): void {
    app = newApp;
}
