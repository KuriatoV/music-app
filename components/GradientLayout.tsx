import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';

interface Props {
    title: string;
    image: any;
    color: any;
    subtitle: string;
    description: string;
    roundImage: boolean;
    children: React.ReactElement;
}

const GradientLayout: React.FC<Props> = ({
    children,
    roundImage,
    image,
    color,
    subtitle,
    title,
    description,
}) => {
    return (
        <Box
            height="100%"
            overflowY="auto"
            bgGradient={`linear(${color}.500 0%,${color}.600 15%, ${color}.700 40%,rgba(0,0,0.95) 75%)`}
        >
            <Flex bg={`${color}.600`} padding="40px" align="end">
                <Box padding="20px">
                    <Image
                        boxSize="160px"
                        boxShadow="dark-lg"
                        src={image}
                        borderRadius={roundImage ? '100%' : '3px'}
                    />
                </Box>
                <Box padding="20px" lineHeight="50px" color="white">
                    <Text
                        fontSize="x-small"
                        fontWeight="bold"
                        casing="uppercase"
                    >
                        {subtitle}
                    </Text>
                    <Text fontSize="6xl"> {title}</Text>
                    <Text fontSize="x-small">{description}</Text>
                </Box>
            </Flex>
            <Box paddingY="50px">{children}</Box>
        </Box>
    );
};

export default GradientLayout;
