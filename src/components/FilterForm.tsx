import { Button, Box, Center } from "@chakra-ui/react"
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";

import { FilterTitle } from './FilterTitle';
import { Size } from './Size';
import { Gender } from './Gender';
import { Age } from './Age';
import { httpClientApi } from '../api/httpClientApi';

export function FilterForm() {

    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const onSubmit = data => {
        console.log(data);
        // const response = await httpClientApi.post(....

        router.push("/animals");
    }

    return (
        <>
            <Box
                as="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FilterTitle name="Porte" />
                <Size registerParam={register} />
                <FilterTitle name="Gênero" />
                <Gender registerParam={register} />
                <FilterTitle name="Idade" />
                <Age registerParam={register} />

                <Center>
                    <Button type="submit" colorScheme="blue">Buscar</Button>
                </Center>
            </Box>
        </>
    );

}