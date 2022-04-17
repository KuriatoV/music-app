import { redirect } from 'next/dist/server/api-utils';
import GradientLayout from '../../components/GradientLayout';
import { validateToken } from '../../lib/auth';
import prismaClient from '../../lib/prisma';
import SongsTable from '../../components/SongsTable';

const getBgColor = (id) => {
    const colors = [
        'red',
        'green',
        'blue',
        'orange',
        'purple',
        'gray',
        'teal',
        'yellow',
    ];

    return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist }) => {
    return (
        <GradientLayout
            color={getBgColor(playlist.id)}
            roundImage={false}
            title={playlist.name}
            subtitle="playlist"
            description={`${playlist.songs.length} songs`}
            image={`https://picsum.photos/400?random=${playlist.id}`}
        >
            <SongsTable songs={playlist.songs} />
        </GradientLayout>
    );
};

export const getServerSideProps = async ({ query, req }) => {
    let user;
    try {
        user = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: '/signin',
            },
        };
    }

    const [playlist] = await prismaClient.playlist.findMany({
        where: {
            id: +query.id,
            userId: user.id,
        },
        include: {
            songs: {
                include: { artist: { select: { name: true, id: true } } },
            },
        },
    });

    return { props: { playlist } };
};

export default Playlist;
