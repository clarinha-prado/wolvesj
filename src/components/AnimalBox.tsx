
import { FiHeart } from 'react-icons/fi';
import { Box, Text, Image, Flex } from "@chakra-ui/react";

interface AnimalInterface {
    animal: {
        id: number;
        nm_animal: string;
        dt_nasc: Date;
        dt_acolh: Date;
        especie: number;
        raca: string;
        sexo: number;
        pelagem: string;
        porte: number;
        caracteristicas: string;
        castrado: number;
        historia: string;
        localizacao: string;
        situacao: number;
        apelidos: string;
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
            <Image
                src="/img/placeholder_rosto.jpg"
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