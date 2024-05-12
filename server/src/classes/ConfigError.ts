import { Colours } from '../types/Colours.js';

const env = Colours.FgMagenta + '.env' + Colours.Reset;

export class ConfigError extends Error {
    public constructor(variableName: string, reason: string) {
        super(
            `Error in ${env} file: ${Colours.FgRed}${variableName}${Colours.Reset} ${reason}.`,
        );
    }

    public static warn(variableName: string, message: string): void {
        console.log(
            `Misconfiguration in ${env} file: ${Colours.FgRed}${variableName}${Colours.Reset} ${message}.`,
        );
    }
}
