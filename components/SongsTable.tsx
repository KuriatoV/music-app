import {
    Box,
    Table,
    Thead,
    Td,
    Tr,
    Th,
    Tbody,
    IconButton,
    Image,
    Flex,
    Text,
} from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { useStoreActions } from 'easy-peasy';
import { formatDate, formatTime } from '../lib/formatters';

const SongsTable = ({ songs }) => {
    const playSongs = useStoreActions(
        (actions: any) => actions.changeActiveSongs
    );
    const setActiveSong = useStoreActions(
        (actions: any) => actions.changeActiveSong
    );

    const handlePlay = (activeSong?) => {
        setActiveSong(activeSong || songs[0]);
        playSongs(songs);
    };
    return (
        <Box bg="transparent" color="white">
            <Box padding="10px" marginBottom="20px">
                <Box marginBottom="30px">
                    <IconButton
                        icon={<BsFillPlayFill fontSize="30px" />}
                        colorScheme="green"
                        aria-label="play"
                        size="lg"
                        isRound
                        onClick={() => handlePlay()}
                    />
                </Box>
            </Box>
            <Table variant="unstyled">
                <Thead
                    borderBottom="1px solid"
                    borderColor="rgba(255,255,255,0.2"
                >
                    <Tr>
                        <Th>#</Th>
                        <Th>Title</Th>
                        <Th>Date Added</Th>
                        <Th>
                            <AiOutlineClockCircle />
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {songs.map((song, i) => (
                        <Tr
                            sx={{
                                transition: 'all .3s',
                                '&:hover': { bg: 'rbga(255,255,255,0.1)' },
                            }}
                            key={song.id}
                            cursor="pointer"
                            onClick={() => handlePlay(song)}
                        >
                            <Td>{i + 1}</Td>
                            <Td>
                                <Flex>
                                    <Box marginX="20px">
                                        <Image
                                            src={`https://picsum.photos/200?random=${i}`}
                                            width="40px"
                                        />
                                    </Box>
                                    <Flex direction="column">
                                        <Text> {song.name}</Text>
                                        <Text color="gray.200">
                                            {song.artist.name}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Td>
                            <Td>{formatDate(song.createdAt)}</Td>
                            <Td>{formatTime(song.duration)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default SongsTable;
