import { Text } from "@chakra-ui/react";

type FilterTitleProps = {
    name: string
}

export function FilterTitle({ name }: FilterTitleProps) {

    return (
        <Text
            textAlign='center'
            bg='#e6e6ff'
            borderTop='2px'
            borderTopStyle='solid'
            borderTopColor='#8CE3D5'
            boxShadow='md'
            fontSize='2.6rem'
            lineHeight='3.2rem'
            mt='0.2rem'
        >
            {name}
        </Text>
    );

}