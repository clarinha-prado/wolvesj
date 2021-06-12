import { Header } from '../components/Header';
import { Flex, Center } from "@chakra-ui/react";

import { AnimalBox } from '../components/AnimalBox';
import { GetServerSidePropsContext } from 'next';

interface AnimaisProps {
    queryResponse: AnimalDTO[];
}

interface AnimalDTO {
    dt_provavel_nasc: Date;
    id: number;
    nm_animal: string;
    porte: number;
}

export function AnimalList({ queryResponse }: AnimaisProps) {

    return (
        <>
            <Center
                bgImage="url('/img/y.jpg')"
                bgPosition={["unset", "center"]}
                bgRepeat="repeat"
                bgSize={["auto", "cover"]}
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

                    {queryResponse.map((item) => (
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