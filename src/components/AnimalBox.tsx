
import { FiHeart } from 'react-icons/fi';
import { Box, Text, Image, Flex, Link } from "@chakra-ui/react";

import config from '../../wolvesj-config.json';

interface AnimalInterface {
    animal: {
        id: number;
        nm_animal: string;
        dt_provavel_nasc: Date;
        porte: number;
    }
}

export function AnimalBox({ animal }: AnimalInterface) {
    return (
        <Flex
            direction="column"
            justify="center"
            pl={['1rem', '2rem']}
            pr={['1rem', '2rem']}
            mb={['2rem', '3.3rem']}
        >
            <Link href={`/animais/${animal.id}`}>
                <Image
                    src={`${config.photo_url}/${animal.id}/0.jpg`}
                    alt="Nome"
                    borderRadius="full"
                    mt="1rem"
                    mb="0.5rem"
                    h="210px"
                    w="210px"
                    border="0px"
                    borderStyle="solid"
                    borderColor="#991143"
                    boxShadow="3px 4px 4px #55595e"
                />
            </Link>
            <Link href={`/animais/${animal.id}`}>
                <Text
                    textAlign='center'
                    fontSize='22px'
                    fontWeight='bold'
                    font="normal bold 22px"
                    color="#991143"
                    textDecoration="none"
                >
                    {animal.nm_animal}
                </Text>
            </Link>
            <Flex
                justify="center"
                align="center"
                fontSize="1rem"
                fontWeight="bold"
                color="#2B3332"
                mt="-0.3rem"
            >
                3 anos
                <Box ml="0.4rem" mr="0.4rem">
                    <FiHeart />
                </Box>
                porte médio
            </Flex>
        </Flex>

    );
}