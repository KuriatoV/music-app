import { Box, Flex, Text, Image } from '@chakra-ui/react';
import GradientLayout from '../components/GradientLayout';
import prismaClient from '../lib/prisma';
import { useMe } from '../lib/hooks';

const ArtistCard = ({ artist }) => {
    return (
        <Box paddingX="10px" width="20%">
            <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                    width="auto"
                    boxShadow="dark-lg"
                    src={artist.avatar}
                    borderRadius="100%"
                />
                <Box marginTop="20px">
                    <Text fontSize="large">{artist.name}</Text>
                    <Text fontSize="x-small">Artist</Text>
                </Box>
            </Box>
        </Box>
    );
};

const Home = ({ artists }) => {
    const { user, isLoading, error } = useMe();

    return (
        <GradientLayout
            roundImage
            color="purple"
            subtitle="profile"
            title={`${user?.firstName} ${user?.lastName}`}
            description={`${user?.playlistsCount} public playlists`}
            image="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
        >
            <Box color="white" paddingX="40px">
                <Box marginBottom="40px">
                    <Text fontSize="3xl" fontWeight="bold">
                        Top artists this month
                    </Text>
                    <Text fontSize="md">Only visible for you</Text>
                </Box>
                <Flex>
                    {artists.map((artist) => (
                        <ArtistCard key={artist.id} artist={artist} />
                    ))}
                </Flex>
            </Box>
        </GradientLayout>
    );
};

export const getServerSideProps = async () => {
    const artists = await prismaClient.artist.findMany({});
    console.log('ar', artists);
    return {
        props: { artists },
    };
};

export default Home;
