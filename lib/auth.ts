import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prisma';

export const validateToken = (token) => jwt.verify(token, 'hello')

export const validateRoute = (handler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        // check token in cookie
        const { TRAX_ACCESS_TOKEN: token } = req.cookies;
        if (token) {
            let user;

            try {
                const { id } = validateToken(token); // get id from token from cookies
                user = await prisma.user.findUnique({
                    where: { id },
                });

                if (!user) {
                    throw new Error('Not real user');
                }
            } catch (error) {
                res.status(401);
                res.json({ error: 'Not Authorized' });
                return;
            }

            return handler(req, res, user);
        }
        res.status(401);
        res.json({ error: 'Not Authorized' });
    };
};
