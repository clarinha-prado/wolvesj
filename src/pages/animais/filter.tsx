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

interface SessionParams {
    sizes: number;
    genders: number;
    ages: number;
    page: number;
}

export default function Filter() {

    // usada p verificar se existe sessão quando o componente é carregado
    const [isInitialized, setIsInitialized] = useState(false);

    // mostrar o formulário de busca ou a lista de animais
    const [showForm, setShowForm] = useState(true);

    // lista de animais e paginação
    const [animals, setAnimals] = useState<IAnimalList>({ data: null });
    const [currentPage, setCurrentPage] = useState(1);

    // opções do formulário
    const [sizes, setSizes] = useState([false, false, false]);
    const [genders, setGenders] = useState([false, false]);
    const [ages, setAges] = useState([false, false, false, false]);

    // obtém do useForm(): 
    // register: define nome dos campos e chama validação
    // handleSubmit: chamar função q recebe os dados do formulário
    // setValue: seleciona os checkboxes via código
    const { register, handleSubmit, setValue } = useForm();

    // esta função é chamada pelo handleSubmit() do react-hook-forms quando o POST é feito
    const onSubmit = (filterFormData: FilterFormData) => {

        // converte parametros do estado para number para reduzir a qtde de params
        const params = convertParams();

        // busca dados no banco de dados através do backend
        wolvesbckApi.get('/animais/filter', { params })
            .then(
                response => {
                    console.log("response: ", response.data.content)

                    // armazena parâmetros de busca na sessão do browser
                    const session = {
                        sizes,
                        genders,
                        ages,
                        page: currentPage
                    };
                    sessionStorage.setItem('@wolvesj-searchParams', JSON.stringify(session));

                    // atualiza estado
                    setAnimals(response);
                    setShowForm(false);
                });
    }

    // inicialização: se existir sessão no browser, busca dados
    useEffect(() => {

        if (!isInitialized) {

            // verifica se existe uma sessão ativa
            let data = sessionStorage.getItem('@wolvesj-searchParams');
            if (data) {
                // converte dados para JSON
                let session = JSON.parse(data);
                console.log("dados obtidos da sessão:", session);

                // converte parametros boleanos da sessão para parametros numerico pro backend
                const params = convertParams(session);

                // busca os dados
                wolvesbckApi.get('/animais/filter', { params })
                    .then(
                        response => {
                            console.log(response.data)

                            // armazena dados retornados no estado
                            setAnimals((value) => response);
                            setShowForm((value) => false);

                            // atualiza estado com os dados da sessão
                            setSizes((value) => session.sizes);
                            setGenders((value) => session.genders);
                            setAges((value) => session.ages);
                            setIsInitialized((value) => true);
                        });
            } else {
                // se não existe sessão ativa, é pra mostrar o formulário
                setIsInitialized((value) => true);
                setShowForm((value) => true);
            }
        }
    }, []);

    useEffect(() => {

        // se não for pra mostrar o formulário, chama onSubmit
        if (!showForm) {
            console.log("detectada mudança de página!!!");
            handleSubmit(onSubmit)();
        }

    }, [currentPage]);

    function convertParams(session?: SessionParams) {

        let usedParam = session ? session.sizes : sizes;

        let sizesParam = usedParam[0] ? 4 : 0;
        sizesParam += usedParam[1] ? 2 : 0;
        sizesParam += usedParam[2] ? 1 : 0;

        usedParam = session ? session.genders : genders;

        let gendersParam = usedParam[0] ? 2 : 0;
        gendersParam += usedParam[1] ? 1 : 0;

        usedParam = session ? session.ages : ages;

        let agesParam = usedParam[0] ? 8 : 0;
        agesParam += usedParam[1] ? 4 : 0;
        agesParam += usedParam[2] ? 2 : 0;
        agesParam += usedParam[3] ? 1 : 0;

        const page = session?.page ?? currentPage ?? 0;

        console.log("na função convertParams() - sessão=", session?.sizes, " - página=", page);
        console.log("sizes=", sizes, "\ngender=", genders, "\nages=", ages, "\npage:", page);

        return {
            sizes: sizesParam,
            genders: gendersParam,
            ages: agesParam,
            page: page - 1
        };
    }

    const requestNewPage = (newPage: number) => {
        console.log("carregar nova página ", newPage);
        setCurrentPage(newPage);
    }

    const headerSearch = (): void => {
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

            wolvesbckApi.get('/animais/filter', {
                params: {
                    sizes: 7,
                    genders: 3,
                    ages: 15,
                }
            }).then(
                response => {
                    console.log(response.data);
                    const params = {
                        sizes: [true, true, true],
                        genders: [true, true],
                        ages: [true, true, true, true]
                    };
                    sessionStorage.setItem('@wolvesj-searchParams', JSON.stringify(params));
                    setAnimals(response);
                    setShowForm(false);
                });
        } else {
            setShowForm(true);
        }
    };

    const handleSizesClick = (index: number) => {
        console.log("===============", sizes);
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
            <Header headerSearch={headerSearch} showForm={showForm} />
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

