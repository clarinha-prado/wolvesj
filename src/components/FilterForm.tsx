import { Button, Box, Center } from "@chakra-ui/react"
import { useForm } from 'react-hook-form';

import { FilterTitle } from './FilterTitle';
import { Size } from './Size';
import { Gender } from './Gender';
import { Age } from './Age';


interface FilterFormData {
    p: string;
    m: string;
    g: string;
    female: string;
    male: string;
    ate10: string;
    de1a5: string;
    de5a10: string;
    acima10: string;
}

interface FilterFormProps {
    onSubmit: (filterFormData: FilterFormData) => void;
}

export function FilterForm({ onSubmit }: FilterFormProps) {

    // obtém do useForm() o register para definir o nome dos campos do formulário
    // e o handleSubmit para chamar uma função q receberá os dados do formulário
    const { register, handleSubmit } = useForm();

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