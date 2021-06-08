import { Header } from '../components/Header';
import { AnimalList } from '../components/AnimalList';
import { Text } from "@chakra-ui/react";
import { FilterForm } from '../components/FilterForm';
import axios from 'axios';
import { useState } from 'react';

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

export default function Filter() {
    const [showForm, setShowForm] = useState(true);
    const [animals, setAnimals] = useState({});

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

    return (
        <>
            < Header />

            {showForm ?
                <>
                    <Text
                        textAlign='center'
                        fontSize='1.9rem'
                    >
                        Escolha as características
                    </Text>
                    <FilterForm onSubmit={onSubmit} />
                </>
                :
                < AnimalList data={animals} />}
        </>
    );
}