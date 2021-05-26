import { Header } from '../components/Header';
import { Flex, Center } from "@chakra-ui/react";
import React from 'react';

import { AnimalBox } from '../components/AnimalBox';

export default function Animals() {

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

                    <AnimalBox />
                    <AnimalBox />
                    <AnimalBox />
                    <AnimalBox />
                    <AnimalBox />
                    <AnimalBox />
                    <AnimalBox />
                    <AnimalBox />
                    <AnimalBox />
                    <AnimalBox />
                    <AnimalBox />

                </Flex>
            </Center>
        </>
    );
}