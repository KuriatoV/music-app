import React from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import {
    Box,
    List,
    ListItem,
    ListIcon,
    Divider,
    // Center,
    LinkBox,
    LinkOverlay,
} from '@chakra-ui/layout';
import {
    MdHome,
    MdSearch,
    MdLibraryMusic,
    MdPlaylistAdd,
    MdFavorite,
} from 'react-icons/md';
import { usePlaylist } from '../lib/hooks';

const navMenu = [
    {
        name: 'Home',
        icon: MdHome,
        route: '/',
    },
    {
        name: 'Search',
        icon: MdSearch,
        route: '/search',
    },
    {
        name: 'Your Library',
        icon: MdLibraryMusic,
        route: '/library',
    },
];
const musicMenu = [
    {
        name: 'Create Playlist',
        icon: MdPlaylistAdd,
        route: '/',
    },
    {
        name: 'Favorites',
        icon: MdFavorite,
        route: '/favorites',
    },
];

const MenuItem: React.FC<{ item: any }> = ({ item }) => (
    <ListItem paddingX="20px" fontSize="16px">
        <LinkBox>
            <NextLink href={item.route} passHref>
                <LinkOverlay>
                    <ListIcon as={item.icon} color="white" marginRight="20px" />
                    {item.name}
                </LinkOverlay>
            </NextLink>
        </LinkBox>
    </ListItem>
);

const Sidebar: React.FC = () => {
    const { playLists } = usePlaylist();

    return (
        <Box
            width="100%"
            height="calc(100vh - 100px)"
            bg="black"
            paddingX="5px"
            color="gray"
        >
            <Box paddingY="20px" height="100%">
                <Box width="120px" marginBottom="20px" paddingX="20px">
                    <NextImage src="/logo.svg" height={60} width={120} />
                </Box>
                <Box marginBottom="20px">
                    <List spacing={2}>
                        {navMenu.map((menuItem) => (
                            <MenuItem key={menuItem.name} item={menuItem} />
                        ))}
                    </List>
                </Box>
                <Box marginTop="20px">
                    <List spacing={2}>
                        {musicMenu.map((item) => (
                            <MenuItem key={item.name} item={item} />
                        ))}
                    </List>
                </Box>
                <Divider color="gray.800" />
                <Box height="50%" overflowY="auto" paddingY="20px">
                    <List spacing={2}>
                        {playLists.map((playlist) => (
                            <ListItem paddingX="20px" key={playlist.id}>
                                <LinkBox>
                                    <NextLink
                                        href={{
                                            pathname: '/playlist/[id]',
                                            query: { id: playlist.id },
                                        }}
                                        passHref
                                    >
                                        <LinkOverlay>
                                            {playlist.name}
                                        </LinkOverlay>
                                    </NextLink>
                                </LinkBox>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
