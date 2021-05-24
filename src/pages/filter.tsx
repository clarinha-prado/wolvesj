import { Header } from '../components/Header';
import { Text } from "@chakra-ui/react";
import { FilterForm } from '../components/FilterForm';

export default function Filter() {

    return (
        <>
            <Header />
            <Text
                textAlign='center'
                fontSize='1.9rem'
            >
                Escolha as características
            </Text>
            <FilterForm />
        </>
    );
}