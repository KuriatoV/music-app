import { useEffect, useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import ReactHowler from 'react-howler';

import {
    Box,
    Text,
    Flex,
    Image,
    ButtonGroup,
    RangeSlider,
    RangeSliderFilledTrack,
    Center,
    IconButton,
    RangeSliderTrack,
    RangeSliderThumb,
} from '@chakra-ui/react';

import {
    MdShuffle,
    MdSkipPrevious,
    MdOutlinePauseCircleFilled,
    MdOutlinePlayCircleFilled,
    MdSkipNext,
    MdOutlineRepeat,
} from 'react-icons/md';

const Player = ({ songs, activeSong }) => {
    const [playing, setPlaying] = useState(true);
    const [index, setIndex] = useState(0);
    const [seek, setSeek] = useState(0.0);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [dupation, setDupation] = useState(0);

    const setPlayState = (value: boolean) => {
        setPlaying(value);
    };
    const onShuffle = () => {
        setShuffle((prev) => !prev);
    };
    const onRepeat = () => {
        setRepeat((prev) => !prev);
    };

    return (
        <Box width="100%">
            <ReactHowler playing={playing} src={activeSong?.url} />
            <Center color="gray.600">
                <ButtonGroup>
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="shuffle"
                        fontSize="25px"
                        icon={<MdShuffle />}
                        color={shuffle ? 'white' : 'gray.600'}
                        onClick={onShuffle}
                    />
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="previous"
                        fontSize="25px"
                        icon={<MdSkipPrevious />}
                    />
                    {playing ? (
                        <IconButton
                            outline="none"
                            variant="link"
                            aria-label="pause"
                            fontSize="40px"
                            color="white"
                            icon={<MdOutlinePauseCircleFilled />}
                            onClick={() => setPlayState(false)}
                        />
                    ) : (
                        <IconButton
                            outline="none"
                            variant="link"
                            aria-label="play"
                            fontSize="40px"
                            color="white"
                            icon={<MdOutlinePlayCircleFilled />}
                            onClick={() => setPlayState(true)}
                        />
                    )}
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="next"
                        fontSize="25px"
                        icon={<MdSkipNext />}
                    />
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="repeat"
                        fontSize="25px"
                        color={repeat ? 'white' : 'gray.600'}
                        icon={<MdOutlineRepeat />}
                        onClick={onRepeat}
                    />
                </ButtonGroup>
            </Center>
            <Box color="gray.600">
                <Flex>
                    <Box width="10%" fontSize="medium">
                        <Text>1:21</Text>
                    </Box>
                    <Box width="80%">
                        <RangeSlider
                            id="player-range"
                            step={0.1}
                            min={0}
                            max={100}
                            color="white"
                        >
                            <RangeSliderTrack bg="gray.800">
                                <RangeSliderFilledTrack bg="gray.600" />
                                <RangeSliderThumb index={0} />
                            </RangeSliderTrack>
                        </RangeSlider>
                    </Box>
                    <Box width="10%" textAlign="right" fontSize="medium">
                        <Text>1:21</Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default Player;
