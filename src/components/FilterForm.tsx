import { Button, Box } from "@chakra-ui/react"
import { SubmitHandler, useForm } from 'react-hook-form';

import { FilterTitle } from './FilterTitle';
import { Size } from './Size';
import { Gender } from './Gender';
import { Age } from './Age';

type FilterAnimalsFormData = {
    size: string,
    gender: string,
    age: string
}

export function FilterForm() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    /*     const handleFilter: SubmitHandler<FilterAnimalsFormData> = async (values) => {
            console.log('na função handleFilter(): ' + values);
        } */

    return (
        <>
            <Box
                as="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FilterTitle name="Porte" />
                <Size />
                <FilterTitle name="Gênero" />
                <Gender />
                <FilterTitle name="Idade" />
                <Age />

                <Button type="submit" colorScheme="blue">Button</Button>
            </Box>
        </>
    );

}