import { Center, Text, Flex } from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface GenderProps {
    handler: (index: number) => void;
    values: boolean[];
    registerParam: UseFormRegister<FieldValues>,
}

const genders = [
    ['/img/female.png', 'Fêmea', 'female'],
    ['/img/male.png', 'Macho', 'male'],
];

export function Gender({ handler, values, registerParam }: GenderProps) {

    return (
        <Center
            ml="3.5rem"
            mr="3.5rem"
            mt="0.2rem"
            mb="1.8rem"
        >

            { genders.map((value, index) => {
                let gap = ['0'];
                if (index !== 0) { gap = ['1rem', '2rem', '4rem']; }
                return (
                    <Flex direction='column' ml={gap} key={index}>
                        <img src={value[0]} alt={value[1]} />
                        <Flex wrap='nowrap' align='baseline' justify='center'>
                            <input
                                name={value[2]}
                                type="checkbox"
                                id={value[2]}
                                value="1"
                                checked={values[index]}
                                onClick={() => handler(index)}
                                onChange={e => { }}
                                {...registerParam(value[2])}
                            />
                            <Text
                                textAlign='center'
                                color='#4d4d4d'
                                fontSize={['1.1rem', '1.2rem', '1.3rem']}
                                lineHeight={['1.3rem', '1.4rem', '1.6rem']}
                                fontWeight="bold"
                                ml='0.6rem'
                            >
                                {value[1]}
                            </Text>
                        </Flex>
                    </Flex>
                );
            })}

        </Center>
    );

}
