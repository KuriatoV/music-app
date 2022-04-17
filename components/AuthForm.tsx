import React, { useState } from 'react';
import { Box, Button, Flex, Input, LinkBox } from '@chakra-ui/react';
import { useRouter } from 'next/router';
// import { useSWRConfig } from 'swr';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { auth } from '../lib/mutations';

const AuthForm: React.FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const user = await auth(mode, { email, password });
        // cache ?
        setIsLoading(false);
        router.push('/');
    };

    return (
        <Box height="100vh" width="100vw" bg="black">
            <Flex
                justify="center"
                align="center"
                height="100px"
                borderBottom="white 1px solid"
            >
                <NextImage src="/logo.svg" height={60} width={120} />
            </Flex>
            <Flex justify="center" align="center" height="calc(100vh - 100px)">
                <Box padding="50px" bg="gray.900" borderRadius="6px">
                    <form onSubmit={handleSubmit}>
                        <Input
                            placeholder="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            marginTop="8px"
                        />
                        <Button
                            type="submit"
                            bg="green.500"
                            isLoading={isLoading}
                            marginTop="16px"
                            sx={{
                                '&:hover': {
                                    bg: 'green.300',
                                },
                            }}
                        >
                            {mode}
                        </Button>
                        <LinkBox>
                            <NextLink
                                href={mode === 'signin' ? '/signup' : '/signin'}
                                passHref
                            >
                                <Button
                                    bg="gray.600"
                                    marginTop="16px"
                                    sx={{
                                        '&:hover': {
                                            bg: 'gray.300',
                                        },
                                    }}
                                >
                                    {mode === 'signin' ? 'signup' : 'signin'}
                                </Button>
                            </NextLink>
                        </LinkBox>
                    </form>
                </Box>
                {/* Go to {mode === 'signup' ? 'signin' : 'signup'} up */}

                {/* <NextLink href="/signup" /> */}
            </Flex>
        </Box>
    );
};

export default AuthForm;
