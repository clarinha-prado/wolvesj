import { Text, Flex } from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface AgeProps {
    registerParam: UseFormRegister<FieldValues>,
}


const genders = [
    ['Até 1 ano', 'ate1'],
    ['De 1 a 5 anos', 'de1a5'],
    ['De 5 a 10 anos', 'de5a10'],
    ['Acima de 10 anos', 'acima10']
];

export function Age({ registerParam }: AgeProps) {

    return (
        <Flex
            direction={['column', 'row']}
            mr="1rem"
            ml={["25vw", "1rem"]}
            mb={["1rem", "2rem"]}
            mt={["1rem", "1.5rem", "1.5rem"]}
            align={['start', 'center']}
            justify="center"
        >

            { genders.map((value, index) => {
                let gap = ['0'];
                if (index !== 3) { gap = ['1rem', '1.3rem', '2rem']; }
                return (
                    <Flex
                        justify="center"
                        wrap='nowrap'
                        align='baseline'
                        mr={gap}
                        key={index}
                    >
                        <input
                            name={value[1]}
                            type="checkbox"
                            id={value[1]}
                            value="1"
                            {...registerParam(value[1])}
                        />
                        <Text
                            textAlign='left'
                            color='#4d4d4d'
                            fontSize={['1.1rem', '1.2rem', '1.3rem']}
                            lineHeight={['2rem', '1.4rem', '1.6rem']}
                            fontWeight="bold"
                            ml='0.6rem'
                        >
                            {value[0]}
                        </Text>
                    </Flex>
                );
            })}

        </Flex>
    );

}
