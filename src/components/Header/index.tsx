import { Flex } from '@chakra-ui/react';
import styles from './Header.module.css';

export function Header() {

    return (
        <div className={styles.header}>
            <img className={styles.logo} src="/img/adote.png" alt="Adote um amigo" />

            <div style={{ display: 'contents' }}>
                <a href="/wolves/animais/filter?newSearch=true">
                    <img
                        src="/img/icon-search.png"
                        alt="Procurar"
                        className="icon-filter"
                        data-toggle="tooltip"
                    />
                </a>
                <img className={styles.logoAmais} src="/img/logo-amais.png" alt="AMAIS" />
            </div>
        </div>

    );

}