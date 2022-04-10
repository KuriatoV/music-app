import { validateRoute } from '../../lib/auth';

import prismaClient from '../../lib/prisma';

export default validateRoute(async (req, res, user) => {
    const playLists = await prismaClient.playlist.findMany({
        where: { userId: user.id },
        orderBy: {
            name: 'asc',
        },
    });

    res.json(playLists);
});
