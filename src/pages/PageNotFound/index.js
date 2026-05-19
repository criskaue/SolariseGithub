import Footer from "../../components/Footer";
import Header from "../../components/Header";
import erro404 from "./images (1).jpg"
import styles from "./PageNotFound.module.css";

function PageNotFound() {
    return(
        <>
        <Header />
        <section className={styles.container}>
            <h2>Ops! Parece que houve um erro.</h2>
            <img src={erro404} alt="Logo de Página não Localizada" />
        </section> 
        <Footer />   
        </>       
    );

}

export default PageNotFound;