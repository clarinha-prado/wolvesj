import { useEffect, useState } from "react";
import { wolvesbckApi } from "../../api/wolvesbckApi";
import { Button, Box, Center, Text, Icon } from "@chakra-ui/react";
import { IoMdPaw } from "react-icons/io";
import { useForm } from 'react-hook-form';

import { FilterTitle } from '../../components/FilterTitle';
import { Size } from '../../components/Size';
import { Gender } from '../../components/Gender';
import { Age } from '../../components/Age';
import { Header } from '../../components/Header';
import { AnimalList } from "../../components/AnimalList";
import { Pagin } from '../../components/Pagin';
import { useRouter } from 'next/router'

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

interface IAnimalList {
    data: {
        content: AnimalDTO[];
        first: boolean;
        last: boolean;
        number: number;
        totalElements: number;
        totalPages: number;
        numberOfElements: number;
    };
}

interface AnimalDTO {
    dt_provavel_nasc: Date;
    id: number;
    nm_animal: string;
    porte: number;
}

export default function Filter() {

    const [isInitialized, setIsInitialized] = useState(false);

    const [showForm, setShowForm] = useState(true);
    const [animals, setAnimals] = useState<IAnimalList>({ data: null });
    const [selectAll, setSelectAll] = useState(false)

    const [sizes, setSizes] = useState([false, false, false]);
    const [genders, setGenders] = useState([false, false]);
    const [ages, setAges] = useState([false, false, false, false]);

    const [currentPage, setCurrentPage] = useState(1);

    // obtém do useForm() o register para definir o nome dos campos do formulário
    // e o handleSubmit para chamar uma função q receberá os dados do formulário
    const { register, handleSubmit, setValue } = useForm();

    const router = useRouter()

    // esta função é chamada pelo handleSubmit() do react-hook-forms quando o POST é feito
    const onSubmit = (filterFormData: FilterFormData) => {

        let sizesParam = sizes[0] ? 4 : 0;
        sizesParam += sizes[1] ? 2 : 0;
        sizesParam += sizes[2] ? 1 : 0;

        let gendersParam = genders[0] ? 2 : 0;
        gendersParam += genders[1] ? 1 : 0;

        let agesParam = ages[0] ? 8 : 0;
        agesParam += ages[1] ? 4 : 0;
        agesParam += ages[2] ? 2 : 0;
        agesParam += ages[3] ? 1 : 0;

        console.log("sizes=", sizes, " gender=", genders, " ages=", ages);

        wolvesbckApi.get('/animais/filter', {
            params: {
                sizes: sizesParam,
                genders: gendersParam,
                ages: agesParam,
                newPage: currentPage - 1
            }
        }).then(
            response => {
                console.log(response.data)
                setAnimals(response);
                const params = { sizes, genders, ages };
                sessionStorage.setItem('@wolvesj-searchParams', JSON.stringify(params));
                setShowForm(false);
            });
    }

    // effects
    useEffect(() => {
        if (!isInitialized) {

            // se a página foi chamada sem parâmetros na query string
            if (JSON.stringify(router.query) === '{}') {
                let data = sessionStorage.getItem('@wolvesj-searchParams');
                // se existe uma sessão ativa
                if (data) {
                    let params = JSON.parse(data);
                    console.log("dados da sessão:", params);

                    let sizesParam = params.sizes[0] ? 4 : 0;
                    sizesParam += params.sizes[1] ? 2 : 0;
                    sizesParam += params.sizes[2] ? 1 : 0;

                    let gendersParam = params.genders[0] ? 2 : 0;
                    gendersParam += params.genders[1] ? 1 : 0;

                    let agesParam = params.ages[0] ? 8 : 0;
                    agesParam += params.ages[1] ? 4 : 0;
                    agesParam += params.ages[2] ? 2 : 0;
                    agesParam += params.ages[3] ? 1 : 0;

                    console.log("sizes=", params.sizes, " gender=", params.genders, " ages=", params.ages);

                    wolvesbckApi.get('/animais/filter', {
                        params: {
                            sizes: sizesParam,
                            genders: gendersParam,
                            ages: agesParam,
                            newPage: currentPage - 1
                        }
                    }).then(
                        response => {
                            console.log(response.data)
                            setAnimals(response);
                            const params = { sizes, genders, ages };
                            sessionStorage.setItem('@wolvesj-searchParams', JSON.stringify(params));
                            setShowForm(false);

                            // atualiza estado com os dados da sessão
                            setSizes(params.sizes);
                            setGenders(params.genders);
                            setAges(params.ages);
                            setIsInitialized(true);
                        });
                } else {
                    // se não existe sessão ativa, é pra mostrar o formulário
                    setIsInitialized(true);
                    setShowForm(true);
                }
            }
        }
    }, [isInitialized, setSizes, setGenders, setAges]);

    useEffect(() => {

        // se não for pra mostrar o formulário, chama onSubmit
        if (!showForm) {
            handleSubmit(onSubmit)();
        }

    }, [currentPage]);

    const requestNewPage = (newPage: number) => {
        console.log("carregar página ", newPage);
        setCurrentPage(newPage);
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

            setSizes([true, true, true]);
            setGenders([true, true]);
            setAges([true, true, true, true]);

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
            {isInitialized ?
                <>
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
                                    <Button
                                        type="submit"
                                        bgColor="#e6880e"
                                        _hover={{ bg: "blue" }}
                                        color="white"
                                        mb="1rem"
                                        minW="0"
                                        fontSize="1rem"
                                        style={{
                                            whiteSpace: "normal",
                                        }}
                                    >
                                        <Icon as={IoMdPaw} />
                                        <Text ml={["5px", "5px", "10px"]}>
                                            Buscar
                                        </Text>
                                    </Button>
                                </Center>

                            </Box>
                        </>
                        :
                        <>
                            <AnimalList queryResponse={animals.data.content} />
                            <Pagin page={animals.data} requestNewPage={requestNewPage} />
                        </>
                    }
                </>
                :
                <h1>Carregando página...</h1>
            }
        </>
    );
}

