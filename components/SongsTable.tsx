import {
    Box,
    Table,
    Thead,
    Td,
    Tr,
    Th,
    Tbody,
    IconButton,
} from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';

const SongsTable = ({ songs }) => {
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
            </Table>
        </Box>
    );
};

export default SongsTable;
