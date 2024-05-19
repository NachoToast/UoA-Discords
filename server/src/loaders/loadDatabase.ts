import pg from 'pg';
import { Config } from '../types/index.js';

export async function loadDatabase({
    postgres: clientConfig,
}: Config): Promise<void> {
    const client = new pg.Client(clientConfig);

    await client.connect();
}
