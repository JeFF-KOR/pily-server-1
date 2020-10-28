import * as express from 'express';

export const signout = (req: express.Request, res: express.Response) => {
    req.logout();
    res.redirect('//localhost:3000/sign');
}