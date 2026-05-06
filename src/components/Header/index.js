import styles from "./Header.module.css";

function Header() {

return (
    <header className={styles.header}>
        <span>Solarise</span>
        <nav>
            <a href="/#">Home</a>
            <a href="/#">Quem somos</a>
        </nav>
    </header>
);

}

export default Header;