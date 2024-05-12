import { Endpoint } from '../../types/Endpoint.js';

export const getRoot: Endpoint<void, string> = (_req, res) => {
    res.status(200).send(
        `You found the UoA Discords API!<br />Having a look around? Check out the <a href="/api-docs">API documentation!</a>`,
    );
};
