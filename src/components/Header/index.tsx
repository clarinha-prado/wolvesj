import { Button, Text, Icon } from "@chakra-ui/react";
import { IoMdPaw } from "react-icons/io";
import styles from './Header.module.css';

interface HeaderProps {
    showAll: () => void;
    showForm: boolean;
}

export function Header({ showAll, showForm }: HeaderProps) {

    function handleClick() {
        showAll();
    }

    return (
        <div className={styles.header}>
            <img className={styles.logo} src="/img/adote.png" alt="Adote um amigo" />

            <div style={{ display: 'contents', marginTop: '1rem' }}>
                <Button
                    onClick={handleClick}
                    bgColor="#e6880e"
                    color="white"
                    minW="0"
                    ml={["0", "1rem", "7rem", "12rem"]}
                    fontSize={["0.8rem", "0.9rem", "1rem"]}
                    style={{
                        whiteSpace: "normal",
                    }}
                >
                    <Icon as={IoMdPaw} />
                    <Text ml={["5px", "5px", "10px"]}>
                        {showForm ? 'Mostrar todos' : 'Nova Busca'}
                    </Text>
                </Button>
                <img className={styles.logoAmais} src="/img/logo-amais.png" alt="AMAIS" />
            </div>
        </div>

    );

}
