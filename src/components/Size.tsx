import { Center, Text, Flex } from "@chakra-ui/react";


const sizes = [
    ['/img/p.png', 'Porte pequeno', 'Pequeno', 'Até 10kg', 'P'],
    ['/img/m.png', 'Porte Médio', 'Médio', 'De 10kg a 25kg', 'M'],
    ['/img/g.png', 'Porte Grande', 'Grande', 'Acima de 25kg', 'G']
];

export function Size() {

    return (
        <Center m="0.2rem" mb="2rem">

            { sizes.map((value, index) => {
                let gap = ['0'];
                if (index !== 0) { gap = ['1rem', '2rem', '4rem']; }
                return (
                    <Flex direction='column' ml={gap} key={index}>
                        <img src={value[0]} alt={value[1]} />
                        <Flex direction='column'>
                            <Flex wrap='nowrap' align='baseline' justify='center'>
                                <input name={value[4]} type="checkbox" id={value[4]} value="1" />
                                <Text
                                    textAlign='center'
                                    color='#4d4d4d'
                                    fontSize={['1.1rem', '1.2rem', '1.3rem']}
                                    lineHeight={['1.3rem', '1.4rem', '1.6rem']}
                                    fontWeight="bold"
                                    ml='0.6rem'
                                >
                                    {value[2]}
                                </Text>
                            </Flex>
                            <div>
                                <Text
                                    textAlign='center'
                                    color='#4d4d4d'
                                    fontSize={['0.8rem', '0.9rem', '0.9rem']}
                                    lineHeight={['1rem', '1rem', '1rem']}
                                    ml='0.2rem'
                                >
                                    {value[3]}
                                </Text>
                            </div>
                        </Flex>
                    </Flex>
                );
            })}

        </Center>
    );

}
