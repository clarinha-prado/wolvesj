import styles from './Header.module.css';

export function Header() {

    return (
        <div className={styles.header}>
            <img className={styles.logo} src="/img/adote.png" alt="Adote um amigo" />

            <div style={{ display: 'contents', marginTop: '1rem' }}>
                <a href="/wolves/animais/filter?newSearch=true">
                    <img
                        src="/img/icon-search.png"
                        alt="Procurar"
                        className="icon-filter"
                        data-toggle="tooltip"
                        style={{ paddingTop: '0.5rem' }}
                    />
                </a>
                <img className={styles.logoAmais} src="/img/logo-amais.png" alt="AMAIS" />
            </div>
        </div>

    );

}