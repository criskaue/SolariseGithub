import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function Home() {
  return (
    <>
      <Header/>
      <Container>
        <h1>Hello World!</h1>
        <p>Estou aprendendo React js!</p>
      </Container>
      <Footer/>
    </>
  );
}

export default Home;