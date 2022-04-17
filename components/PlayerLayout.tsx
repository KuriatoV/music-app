import React from 'react';
import { Box } from '@chakra-ui/layout';
import Sidebar from './Sidebar';
import PlayerBar from './PlayerBar';

const PlayerLayout: React.FC = ({ children }) => {
    return (
        <Box width="100vw" maxWidth="100vw" height="100vh" bg="red.500">
            <Box position="absolute" top="0" left="0" width="250px">
                <Sidebar />
            </Box>
            <Box marginLeft="250px" marginBottom="100px" bg="yellow.500">
                <Box height="calc(100vh - 100px)">{children}</Box>
            </Box>
            <Box
                position="absolute"
                left="0"
                bottom="0"
                width="100vw"
                height="100px"
                bg="gray.600"
            >
                <PlayerBar  />
            </Box>
        </Box>
    );
};

export default PlayerLayout;
