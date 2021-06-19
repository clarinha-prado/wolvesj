import {
    Table, Tbody, Tr, Td, Button,
    Center, Box, Text, Image, Flex, SimpleGrid
} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import fs from 'fs';

import { getAge } from '../../utils/getAge';
import { wolvesbckApi } from "../../api/wolvesbckApi";
import config from '../../../wolvesj-config.json';
import { useEffect, useState } from 'react';

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

    const [id, setId] = useState(animal.id);
    const [idsList, setIdsList] = useState([]);
    const [previous, setPrevious] = useState<number>(null)
    const [next, setNext] = useState<number>(null)

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    const router = useRouter()
    if (router.isFallback) {
        return <div>Carregando...</div>
    }

    useEffect(() => {
        console.log("executando useEffect(..., [idsList,id]) - id=", id);

        let _previous = null;
        let _next = null;
        let found = false;
        for (let i = 0; i < idsList.length; i++) {

            if (found) {
                _next = idsList[i];
                break;
            }

            if (idsList[i] === id) {
                found = true;
            } else {
                _previous = idsList[i];
            }
        };

        setPrevious(_previous);
        setNext(_next);
    }, [idsList, id]);

    useEffect(() => {
        console.log("executando useEffect()");

        // verifica se existe uma sessão ativa
        let data = sessionStorage.getItem('@wolvesj-searchParams');
        if (data) {
            // converte dados para JSON
            let session = JSON.parse(data);
            console.log("dados obtidos da sessão:", session);

            // converte parametros boleanos da sessão para parametros numerico pro backend
            let sizesParam = session.sizes[0] ? 4 : 0;
            sizesParam += session.sizes[1] ? 2 : 0;
            sizesParam += session.sizes[2] ? 1 : 0;

            let gendersParam = session.genders[0] ? 2 : 0;
            gendersParam += session.genders[1] ? 1 : 0;

            let agesParam = session.ages[0] ? 8 : 0;
            agesParam += session.ages[1] ? 4 : 0;
            agesParam += session.ages[2] ? 2 : 0;
            agesParam += session.ages[3] ? 1 : 0;

            const params = {
                sizes: sizesParam,
                genders: gendersParam,
                ages: agesParam,
            };

            // buscar lista de ids
            wolvesbckApi.get("/animais/ids", { params })
                .then((response) => {
                    console.log("lista de ids retornada:", response.data);
                    setIdsList(() => response.data);
                });
        }
    }, []);

    SwiperCore.use([Navigation, Autoplay]);

    function changePage(direction: number) {
        let _newPage: number;
        direction === 0 ? _newPage = previous : _newPage = next;
        router.push(`/animais/${_newPage}`);
        setId(_newPage);
    }

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
                                        <Td>{animal.sexo === 0 ? "Castrada" : "Castrado"}</Td>
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
            <Center mt="1rem" mb="3rem">
                <SimpleGrid columns={3} spacing={10}>
                    <Button
                        href="#"
                        w="7"
                        h="7"
                        bg="gray.200"
                        fontSize="sm"
                        disabled={previous ? false : true}
                        onClick={() => changePage(0)}
                        _hover={{ bg: "gray.400" }}
                    >
                        {previous}&lt;&lt;
                    </Button>
                    <Button
                        href="#"
                        w="14"
                        h="7"
                        bg="#991143"
                        color="white"
                        fontSize="sm"
                        onClick={() => router.push("/animais/filter")}
                        _hover={{ bg: "blue" }}
                    >
                        voltar
                    </Button>
                    <Button
                        href="#"
                        w="7"
                        h="7"
                        justifySelf="end"
                        bg="gray.200"
                        fontSize="sm"
                        disabled={next ? false : true}
                        onClick={() => changePage(1)}
                        _hover={{ bg: "gray.400" }}
                    >
                        &gt;&gt;{next}
                    </Button>
                </SimpleGrid>
            </Center>
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
        photos.push(config.photo_url + '/' + animal.id + '/' + file);
        console.log(config.photo_url + '/' + animal.id + '/' + file);
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
