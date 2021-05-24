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
            fontSize='2.5rem'
            lineHeight='2.5rem'
            mt='0.2rem'
        >
            {name}
        </Text>
    );

}