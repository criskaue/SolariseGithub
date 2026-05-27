import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Cadastro.module.css";
import solarBg from "../../components/images/solar.jpg";
import logoImg from "../../components/images/logo.png";

function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  function handleCadastro(event) {
    event.preventDefault();
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }
    navigate("/login");
  }

  return (
    <div className={styles.page}>

      <div
        className={styles.leftPanel}
        style={{ backgroundImage: `linear-gradient(rgba(15,44,17,0.55), rgba(15,44,17,0.55)), url(${solarBg})` }}
      >
        <img src={logoImg} alt="Solarise" className={styles.logoImg} />
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.tabs}>
          <Link to="/login" className={styles.tab}>Login</Link>
          <span className={`${styles.tab} ${styles.tabActive}`}>Cadastro</span>
        </div>

        <form className={styles.form} onSubmit={handleCadastro}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErro(""); }}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Senha</label>
            <div className={styles.passwordWrapper}>
              <input
                className={styles.input}
                type={mostrarSenha ? "text" : "password"}
                placeholder="••••••"
                value={senha}
                onChange={(e) => { setSenha(e.target.value); setErro(""); }}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setMostrarSenha(!mostrarSenha)}
                aria-label="Mostrar senha"
              >
                {mostrarSenha ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#528B55" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#528B55" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Confirmar senha</label>
            <div className={styles.passwordWrapper}>
              <input
                className={styles.input}
                type={mostrarConfirmar ? "text" : "password"}
                placeholder="••••••"
                value={confirmarSenha}
                onChange={(e) => { setConfirmarSenha(e.target.value); setErro(""); }}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                aria-label="Mostrar confirmação de senha"
              >
                {mostrarConfirmar ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#528B55" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#528B55" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {erro && <p className={styles.erro}>{erro}</p>}

          <button type="submit" className={styles.cadastrarBtn}>Cadastrar</button>
        </form>

        <Link to="/login" className={styles.jaTemConta}>Já tem uma conta? Login</Link>

        <div className={styles.social}>
          <p className={styles.socialText}>Conecte-se com as redes sociais</p>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIcon} aria-label="Twitter">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#528B55">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#528B55">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Google">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#528B55">
                <path d="M21.8 10.2H12v3.6h5.6c-.5 2.7-2.9 4.4-5.6 4.4-3.3 0-6-2.7-6-6s2.7-6 6-6c1.5 0 2.8.5 3.8 1.4l2.7-2.7C16.8 3.5 14.5 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12S6.7 21.6 12 21.6c5.5 0 9.6-3.9 9.6-9.6 0-.6-.1-1.2-.2-1.8z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
