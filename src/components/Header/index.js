import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {

return (
    <header className={styles.header}>
        <Link to="/">
            <span>Solarise</span>
        </Link>
        <nav>
            <Link to="/cadastro">Cadastrar-se</Link>
            <Link to="/login">Login</Link>
        </nav>
    </header>
);

}

export default Header;