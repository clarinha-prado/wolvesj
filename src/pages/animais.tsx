import { Header } from '../components/Header';
import { Flex, Center } from "@chakra-ui/react";

import { AnimalBox } from '../components/AnimalBox';
import { GetServerSidePropsContext } from 'next';

interface AnimaisProps {
    data: AnimalInterface[];
}

interface AnimalInterface {
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

export default function Animais({ data }: AnimaisProps) {

    return (
        <>
            <Header />
            <Center
                bgImage="url('/img/y.jpg')"
                bgPosition="center"
                bgRepeat={["repeat", "no-repeat"]}
                h="auto"
                w="100%"
                pr="1rem"
                pl="1rem"
            >
                <Flex
                    direction='row'
                    wrap='wrap'
                    justify='space-around'
                >

                    {data.map((item) => (
                        <AnimalBox key={item.id} animal={item} />
                    ))}

                </Flex>
            </Center>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const res = await fetch(`http://localhost:8080/animais`);
    const data = await res.json();

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data
        }, // will be passed to the page component as props
    }
}