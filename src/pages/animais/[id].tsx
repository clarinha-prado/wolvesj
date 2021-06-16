import {
    Table, Tbody, Tr, Td,
    Center, Box, Text, Image, Flex
} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import fs from 'fs';

import { getAge } from '../../utils/getAge';
import { wolvesbckApi } from "../../api/wolvesbckApi";
import config from '../../../wolvesj-config.json';
import { useEffect } from 'react';

interface AnimalProps {
    animal: AnimalInterface;
}

interface AnimalInterface {
    id: number;
    nm_animal: string;
    dt_provavel_nasc: Date;
    dt_acolhimento: Date;
    especie: number;
    raca: string;
    sexo: number;
    pelagem: string;
    porte: number;
    caracteristicas: string;
    castrado: number;
    historia: string;
    photos: string[];
}

export default function Animal({ animal }: AnimalProps) {

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    const router = useRouter()
    if (router.isFallback) {
        return <div>Carregando...</div>
    }

    useEffect(() => {
        // obter nome de todos os arquivos de imagens do animal

    }, []);

    SwiperCore.use([Navigation, Autoplay]);

    return (
        <>
            <Flex
                direction="column"
                w="100%"
                maxW="1200px"
                margin="auto"
                pl="1rem"
                pr="1rem"
            >
                <Text
                    fontSize={["2rem", "2.5rem"]}
                    fontWeight="bold"
                    color="#991143"
                >
                    {animal.nm_animal}</Text>

                <Flex direction={["column", "row"]}>

                    <Box w="50%" mr="2rem">
                        <Swiper
                            slidesPerView={1}
                            navigation={true}
                            autoplay={{
                                "delay": 4000,
                                "disableOnInteraction": false
                            }}
                            autoHeight
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            {animal.photos.map((photo, index) =>
                                <SwiperSlide key={index}>
                                    <Image
                                        w="100%"
                                        src={photo}
                                    />
                                </SwiperSlide>
                            )}
                        </Swiper>

                    </Box>

                    <Box w="50%" >
                        <Table
                            variant="striped"
                            colorScheme="gray"
                            pr="1rem"
                            size="sm"
                        >
                            <Tbody>
                                <Tr>
                                    <Td>{animal.sexo === 0 ? "Fêmea" : "Macho"}</Td>
                                </Tr>
                                <Tr>
                                    <Td>{animal.raca}</Td>
                                </Tr>
                                <Tr>
                                    <Td>{getAge(animal.dt_provavel_nasc)}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Porte {animal.porte === 0 ? "pequeno" :
                                        animal.porte === 1 ? "médio" : "grande"}</Td>
                                </Tr>
                                {animal.castrado === 0 &&
                                    <Tr>
                                        <Td>Castrado</Td>
                                    </Tr>}
                            </Tbody>
                        </Table>
                        <Box
                            ml="0.25rem"
                            mr="0.25rem"
                            mt="0.5rem"
                        >
                            <Text
                                fontWeight="bold"
                                fontSize={["1.2rem", "1.5rem"]}
                                color="#991143"
                            >
                                Características
                            </Text>
                            <Text textAlign="justify">
                                {animal.caracteristicas}
                            </Text>
                        </Box>
                    </Box>
                </Flex>
                <Text
                    mt="1rem"
                    fontWeight="bold"
                    fontSize={["1.2rem", "1.5rem"]}
                    color="#991143"
                >                    Histórico
                </Text>
                <Text textAlign="justify">
                    {animal.historia}
                </Text>
            </Flex>
        </>
    );
}

// Todos animais já cadastrados serão renderizados em tempo de build
// novos animais serão renderizados na primeira chamada deles (ISR - Incremental
// Server Rendering)
export async function getStaticPaths() {
    // Call an external API endpoint to get data
    /*             const res = await fetch('http://.../animais/')
                const animais = await res.json()
        
                // Get the paths we want to pre-render based on posts
                const paths = animais.map((animal) => ({
                    params: { id: animal.id },
                })) */

    const paths = [{ params: { "id": "0" } }]
    return { paths, fallback: 'blocking' }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const animal = await wolvesbckApi.get(`/animais/${params.id}`)
        .then((response) => response.data);

    if (!animal) {
        return {
            notFound: true,
        }
    }

    // obter lista de fotos
    const dir = `${config.photo_directory}/${params.id}`;
    const files = fs.readdirSync(dir);

    let photos: string[] = [];
    for (const file of files) {
        photos.push(config.photo_url + animal.id + '/' + file);
        console.log(config.photo_url + animal.id + '/' + file);
    }

    animal.photos = photos;

    // Pass post data to the page via props
    return {
        props: { animal },
        // Re-generate the post at most once per second
        // if a request comes in
        revalidate: 1,
    }
}
