import {
    Table,
    Tbody,
    Tr,
    Td
} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { wolvesbckApi } from "../../api/wolvesbckApi";
import { Center, Box, Text, Image, Flex } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import fs from 'fs';

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
            <Flex direction="column" w="100%" maxW="1200px" >
                <Text>{animal.nm_animal}</Text>

                <Flex direction={["column", "row"]}>

                    <Box w="40%">
                        <Swiper
                            slidesPerView={1}
                            navigation={true}
                            autoplay={{
                                "delay": 3500,
                                "disableOnInteraction": false
                            }}
                            autoHeight
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            {animal.photos.map((photo) =>
                                <SwiperSlide>
                                    <Image
                                        w="100%"
                                        src={photo}
                                    />
                                </SwiperSlide>
                            )}
                        </Swiper>

                    </Box>

                    <Box>
                        <Table variant="striped" colorScheme="teal">
                            <Tbody>
                                <Tr>
                                    <Td>{animal.porte}</Td>
                                </Tr>
                                <Tr>
                                    <Td>{animal.raca}</Td>
                                </Tr>
                                <Tr>
                                    <Td>XX anos</Td>
                                </Tr>
                                <Tr>
                                    <Td>Porte {animal.porte}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Porte {animal.castrado}</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                        <Box>Características: {animal.caracteristicas}</Box>
                    </Box>
                </Flex>
                <Text>
                    Histórico
                </Text>
                <Text>
                    {animal.historia}
                </Text>
            </Flex>

            <Center>Paginação</Center>
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

    const paths = [{ params: { "id": "1" } }]
    return { paths, fallback: 'blocking' }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const animal = await wolvesbckApi.get('/animais/1')
        .then((response) => response.data);

    if (!animal) {
        return {
            notFound: true,
        }
    }

    // obter lista de fotos
    const dir = `${config.photo_directory}${"/1"}`;
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
