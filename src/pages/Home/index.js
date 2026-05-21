import { useState } from "react";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "./Home.module.css"

function Home() {

  function pegarnome(event){
    console.log(event.target.value)
    setNome(event.target.value)
  }

  const [ nome, setNome ] = useState()

  return (
    <>
      <Header/>
      <section className={styles.Container}>
        <Container>

          <input
            type="text"
            placeholder="Nome"
            onChange={pegarnome}

            />
            <h2>{nome}</h2>

        </Container>
      </section>
      <Footer/>
    </>
  );
}

export default Home;