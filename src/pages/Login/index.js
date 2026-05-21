import styles from "./Login.module.css";
import Header from "../../components/Header"
import Container from "../../components/Container"
import Footer from "../../components/Footer"
import Form from "../../components/Form";

function Login() {
    return(
        <>
            <Header />
            <Container>
                <Form />
            </Container>
            <Footer />
        </>
    );
}

export default Login;