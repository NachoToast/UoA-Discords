import { Endpoint } from '../../types/Endpoint.js';

export const getIp: Endpoint<void, string> = (req, res) => {
    res.status(200).send(req.ip);
};
