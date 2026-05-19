import styles from "./Login.module.css";
import Header from "../../components/Header"
import Container from "../../components/Container"
import Footer from "../../components/Footer"

function Login() {
    return(
        <>
            <Header />
            <Container>
                <section className={styles.login}>
                    <h1>Login</h1>
                </section>
            </Container>
            <Footer />
        </>
    );
}

export default Login;