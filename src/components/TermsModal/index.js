import styles from "./TermsModal.module.css";
import logoImg from "../images/Logo (2).png";

function TermsModal({ onAccept }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <img src={logoImg} alt="Solarise" className={styles.logo} />

        <h1 className={styles.title}>
          Bem vindo
          <br />
          ao Solarise
        </h1>

        <p className={styles.intro}>
          Antes de continuar, conheça como tratamos os seus dados pessoais,
          em conformidade com a Lei Geral de Proteção de Dados (LGPD).
        </p>

        <h2 className={styles.subtitle}>Termos de uso e Privacidade</h2>

        <p className={styles.terms}>
          Ao utilizar a plataforma Solarise, você concorda com o tratamento dos
          seus dados pessoais de acordo com a Lei nº 13.709/2018 (Lei Geral de
          Proteção de Dados – LGPD). Coletamos apenas os dados necessários para
          a criação e a gestão da sua conta — como nome, e-mail e, no caso de
          empresas instaladoras, os dados da organização (razão social, CNPJ e
          e-mail de contato) — com a finalidade de viabilizar o cadastro, a
          autenticação e a prestação dos serviços de gestão de energia solar.
          O tratamento dos seus dados tem como base legal o seu consentimento
          e a execução do contrato, e os dados não são compartilhados com
          terceiros sem a sua autorização, salvo por obrigação legal ou
          regulatória. Adotamos medidas técnicas e organizacionais para
          proteger as suas informações contra acessos não autorizados, perda
          ou uso indevido. Você, como titular dos dados, pode a qualquer momento
          solicitar o acesso, a correção, a portabilidade, a anonimização ou a
          exclusão dos seus dados, bem como revogar este consentimento, por meio
          dos nossos canais de atendimento. Ao clicar em “Eu concordo”, você
          declara estar ciente e de acordo com estes termos e com a nossa
          Política de Privacidade.
        </p>

        <button type="button" className={styles.acceptBtn} onClick={onAccept}>
          Eu concordo
        </button>
      </div>
    </div>
  );
}

export default TermsModal;
