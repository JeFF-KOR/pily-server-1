import * as express from 'express';
import { BASEURL_client } from '../helper'

export const signout = (req: express.Request, res: express.Response) => {
    req.logout();
    res.redirect(`${BASEURL_client}/sign`);
}