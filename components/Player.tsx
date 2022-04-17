import { useEffect, useState, useRef } from 'react';
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
import { formatTime } from '../lib/formatters';

const Player = ({ songs, activeSong }) => {
    const [playing, setPlaying] = useState(true);
    const [index, setIndex] = useState(
        songs.findIndex((s) => s.id === activeSong.id)
    );
    const [seek, setSeek] = useState(0.0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [duration, setDuration] = useState(0);
    const soundRef = useRef(null);
    const repeatRef = useRef(repeat);
    const setActiveSong = useStoreActions(
        (actions: any) => actions.changeActiveSong
    );

    const prevSong = () => {
        setIndex((prevIndex) => (prevIndex ? prevIndex - 1 : songs.length - 1));
    };
    const nextSong = () => {
        setIndex((prevIndex) => {
            if (shuffle) {
                const nextIndex = Math.floor(Math.random() * songs.length);

                if (nextIndex === prevIndex) {
                    return nextSong();
                }
                return nextIndex;
            }
            return prevIndex === songs.length - 1 ? 0 : prevIndex + 1;
        });
    };

    const setPlayState = (value: boolean) => {
        setPlaying(value);
    };
    const onShuffle = () => {
        setShuffle((prev) => !prev);
    };
    const onRepeat = () => {
        setRepeat((prev) => !prev);
    };
    const onEnd = () => {
        if (repeatRef.current) {
            setSeek(0);
            soundRef.current.seek(0);
        } else {
            nextSong();
        }
    };
    const onLoad = () => {
        const songDuration = soundRef.current.duration();
        setDuration(songDuration);
    };
    const onSeek = (e) => {
        setSeek(parseFloat(e[0]));
        soundRef.current.seek(e[0]);
    };
    useEffect(() => {
        repeatRef.current = repeat;
    }, [repeat]);

    useEffect(() => {
        let reqAnimationId: any;

        if (playing && !isSeeking) {
            const f = () => {
                setSeek(soundRef.current.seek());
                reqAnimationId = requestAnimationFrame(f);
            };

            reqAnimationId = requestAnimationFrame(f);
            return () => cancelAnimationFrame(reqAnimationId);
        }
        cancelAnimationFrame(reqAnimationId);
    }, [playing, isSeeking]);

    useEffect(() => {
        setActiveSong(songs[index]);
    }, [index, setActiveSong, songs]);

    return (
        <Box width="100%">
            <ReactHowler
                ref={soundRef}
                playing={playing}
                src={activeSong?.url}
                onLoad={onLoad}
                onEnd={onEnd}
            />
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
                        onClick={prevSong}
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
                        onClick={nextSong}
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
                        <Text>{formatTime(seek)}</Text>
                    </Box>
                    <Box width="80%">
                        <RangeSlider
                            id="player-range"
                            step={0.1}
                            min={0}
                            color="white"
                            max={duration ? +duration.toFixed(2) : 0}
                            onChange={onSeek}
                            value={[seek]}
                            onChangeStart={() => setIsSeeking(true)}
                            onChangeEnd={() => setIsSeeking(false)}
                        >
                            <RangeSliderTrack bg="gray.800">
                                <RangeSliderFilledTrack bg="gray.600" />
                                <RangeSliderThumb index={0} />
                            </RangeSliderTrack>
                        </RangeSlider>
                    </Box>
                    <Box width="10%" textAlign="right" fontSize="medium">
                        <Text>{formatTime(duration)}</Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default Player;
