import { useState } from "react";
import axios from "axios";
import { Button, Box, Center, Text } from "@chakra-ui/react";
import { useForm } from 'react-hook-form';

import { FilterTitle } from '../components/FilterTitle';
import { Size } from '../components/Size';
import { Gender } from '../components/Gender';
import { Age } from '../components/Age';
import { Header } from '../components/Header';
import { AnimalList } from "../components/AnimalList";

interface FilterFormData {
    p: string;
    m: string;
    g: string;
    female: string;
    male: string;
    ate1: string;
    de1a5: string;
    de5a10: string;
    acima10: string;
}

interface AnimalList {
    content: AnimalDTO[];
    first: true;
    last: false;
    number: 0;
    totalElements: 32;
    totalPages: 8;
}

interface AnimalDTO {
    dt_provavel_nasc: string;
    id: number;
    nm_animal: string;
    porte: number;
}

export default function Filter() {

    const [showForm, setShowForm] = useState(true);
    const [animals, setAnimals] = useState<AnimalList>([]);
    const [selectAll, setSelectAll] = useState(false)

    const [sizes, setSizes] = useState([false, false, false]);
    const [genders, setGenders] = useState([false, false]);
    const [ages, setAges] = useState([false, false, false, false]);

    // obtém do useForm() o register para definir o nome dos campos do formulário
    // e o handleSubmit para chamar uma função q receberá os dados do formulário
    const { register, handleSubmit, setValue } = useForm();

    // esta função é chamada pelo handleSubmit() do react-hook-forms quando o POST é feito
    const onSubmit = (filterFormData: FilterFormData) => {
        console.log(filterFormData);

        axios.post('http://localhost:8080/animais', filterFormData)
            .then(response => {
                console.log(response.data)
                setAnimals(response.data);
                setShowForm(false);
            });
    }

    const showAll = (): void => {
        if (showForm) {
            setValue("p", true);
            setValue("m", true);
            setValue("g", true);
            setValue("female", true);
            setValue("male", true);
            setValue("ate1", true);
            setValue("de1a5", true);
            setValue("de5a10", true);
            setValue("acima10", true);
            handleSubmit(onSubmit)();
        } else {
            setSelectAll(false);
            setShowForm(true);
        }
    };

    const handleSizesClick = (index: number) => {
        let newSizes = sizes.slice();
        newSizes[index] = !sizes[index];

        setSizes(newSizes);
    }

    const handleGendersClick = (index: number) => {
        let newGenders = genders.slice();
        newGenders[index] = !genders[index];

        setGenders(newGenders);
    }

    const handleAgesClick = (index: number) => {
        let newAges = ages.slice();
        newAges[index] = !ages[index];

        setAges(newAges);
    }

    return (
        <>
            <Header showAll={showAll} showForm={showForm} />
            {showForm ?
                <>
                    <Text
                        textAlign='center'
                        fontSize='1.9rem'
                    >
                        Escolha as características
                    </Text>

                    <Box
                        as="form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FilterTitle name="Porte" />
                        <Size handler={handleSizesClick} values={sizes} registerParam={register} />
                        <FilterTitle name="Gênero" />
                        <Gender handler={handleGendersClick} values={genders} registerParam={register} />
                        <FilterTitle name="Idade" />
                        <Age handler={handleAgesClick} values={ages} registerParam={register} />

                        <Center>
                            <Button type="submit" colorScheme="blue">Buscar</Button>
                        </Center>
                    </Box>
                </>
                :
                <>
                    <AnimalList queryResponse={animals.content} />
                Página 1 de 7, mostrando 20 animais em um total de 127.
                </>
            }
        </>
    );
}