import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Cadastro.module.css";
import { useAuth } from "../../contexts/AuthContext";
import solarBg from "../../components/images/solar.jpg";
import logoImg from "../../components/images/logo.png";

const VAZIO = { nome: "", email: "", senha: "", confirmarSenha: "", orgNome: "", orgCnpj: "", orgEmail: "" };

function validar(campo, valor, senhaAtual = "") {
  switch (campo) {
    case "nome":
      if (!valor.trim()) return "Nome completo é obrigatório.";
      if (valor.trim().length < 2) return "Nome deve ter pelo menos 2 caracteres.";
      return "";
    case "email":
    case "orgEmail":
      if (!valor.trim()) return "Email é obrigatório.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor))
        return "Email inválido! Use o formato nome@dominio.com.";
      return "";
    case "senha":
      if (!valor) return "Senha é obrigatória.";
      if (valor.length < 8) return "Senha inválida! A senha deve ter pelo menos 8 caracteres.";
      if (!/[A-Z]/.test(valor)) return "Senha inválida! A senha deve conter pelo menos uma letra maiúscula.";
      if (!/[a-z]/.test(valor)) return "Senha inválida! A senha deve conter pelo menos uma letra minúscula.";
      if (!/[0-9]/.test(valor)) return "Senha inválida! A senha deve conter pelo menos um número.";
      if (!/[!@#$%&*]/.test(valor))
        return "Senha inválida! A senha deve conter pelo menos um caractere especial (!@#$%&*).";
      return "";
    case "confirmarSenha":
      if (!valor) return "Confirme sua senha.";
      if (valor !== senhaAtual) return "As senhas não coincidem.";
      return "";
    case "orgNome":
      if (!valor.trim()) return "Nome da organização é obrigatório.";
      if (valor.trim().length < 2) return "Nome deve ter pelo menos 2 caracteres.";
      return "";
    case "orgCnpj": {
      if (!valor.trim()) return "CNPJ é obrigatório.";
      const digits = valor.replace(/\D/g, "");
      if (digits.length !== 14)
        return "CNPJ inválido! Use o formato XX.XXX.XXX/XXXX-XX.";
      return "";
    }
    default:
      return "";
  }
}

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [perfil, setPerfil] = useState("instaladora");
  const [orgNome, setOrgNome] = useState("");
  const [orgCnpj, setOrgCnpj] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [erros, setErros] = useState(VAZIO);
  const [erroServidor, setErroServidor] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  function setErro(campo, mensagem) {
    setErros((prev) => ({ ...prev, [campo]: mensagem }));
  }

  function handleBlur(campo, valor) {
    setErro(campo, validar(campo, valor, senha));
  }

  function validarTudo() {
    const novosErros = {
      nome: validar("nome", nome),
      email: validar("email", email),
      senha: validar("senha", senha),
      confirmarSenha: validar("confirmarSenha", confirmarSenha, senha),
      orgNome: perfil === "instaladora" ? validar("orgNome", orgNome) : "",
      orgCnpj: perfil === "instaladora" ? validar("orgCnpj", orgCnpj) : "",
      orgEmail: perfil === "instaladora" ? validar("orgEmail", orgEmail) : "",
    };
    setErros(novosErros);
    return Object.values(novosErros).every((e) => e === "");
  }

  async function handleCadastro(event) {
    event.preventDefault();
    if (!validarTudo()) return;
    setErroServidor("");
    setCarregando(true);
    try {
      const payload = { name: nome, email, password: senha, role: perfil };
      if (perfil === "instaladora") {
        payload.org_name = orgNome;
        payload.org_cnpj = orgCnpj;
        payload.org_email = orgEmail;
      }
      await register(payload);
      navigate("/login");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      if (typeof detail === "string") {
        setErroServidor(detail);
      } else if (Array.isArray(detail)) {
        setErroServidor(detail.map((e) => e.msg).join(" | "));
      } else {
        setErroServidor("Erro ao criar conta. Tente novamente mais tarde.");
      }
    } finally {
      setCarregando(false);
    }
  }

  const EyeIcon = ({ aberto }) => aberto ? (
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
  );

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

        <form className={styles.form} onSubmit={handleCadastro} noValidate>

          <div className={styles.field}>
            <label className={styles.label}>Nome completo</label>
            <input
              className={`${styles.input} ${erros.nome ? styles.inputErro : ""}`}
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => { setNome(e.target.value); setErro("nome", ""); }}
              onBlur={(e) => handleBlur("nome", e.target.value)}
            />
            {erros.nome && <span className={styles.erroCampo}>{erros.nome}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={`${styles.input} ${erros.email ? styles.inputErro : ""}`}
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErro("email", ""); }}
              onBlur={(e) => handleBlur("email", e.target.value)}
            />
            {erros.email && <span className={styles.erroCampo}>{erros.email}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Senha</label>
            <div className={styles.passwordWrapper}>
              <input
                className={`${styles.input} ${erros.senha ? styles.inputErro : ""}`}
                type={mostrarSenha ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                value={senha}
                onChange={(e) => { setSenha(e.target.value); setErro("senha", ""); }}
                onBlur={(e) => handleBlur("senha", e.target.value)}
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setMostrarSenha(!mostrarSenha)} aria-label="Mostrar senha">
                <EyeIcon aberto={mostrarSenha} />
              </button>
            </div>
            {erros.senha && <span className={styles.erroCampo}>{erros.senha}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Confirmar senha</label>
            <div className={styles.passwordWrapper}>
              <input
                className={`${styles.input} ${erros.confirmarSenha ? styles.inputErro : ""}`}
                type={mostrarConfirmar ? "text" : "password"}
                placeholder="Repita a senha"
                value={confirmarSenha}
                onChange={(e) => { setConfirmarSenha(e.target.value); setErro("confirmarSenha", ""); }}
                onBlur={(e) => handleBlur("confirmarSenha", e.target.value)}
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setMostrarConfirmar(!mostrarConfirmar)} aria-label="Mostrar confirmação de senha">
                <EyeIcon aberto={mostrarConfirmar} />
              </button>
            </div>
            {erros.confirmarSenha && <span className={styles.erroCampo}>{erros.confirmarSenha}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Perfil</label>
            <select
              className={styles.input}
              value={perfil}
              onChange={(e) => {
                setPerfil(e.target.value);
                if (e.target.value !== "instaladora") {
                  setOrgNome(""); setOrgCnpj(""); setOrgEmail("");
                  setErros((prev) => ({ ...prev, orgNome: "", orgCnpj: "", orgEmail: "" }));
                }
              }}
            >
              <option value="instaladora">Instaladora</option>
              <option value="locadora">Locadora</option>
            </select>
          </div>

          {perfil === "instaladora" && (
            <>
              <div className={styles.divider}>
                <span>Dados da organização</span>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Nome da organização</label>
                <input
                  className={`${styles.input} ${erros.orgNome ? styles.inputErro : ""}`}
                  type="text"
                  placeholder="Razão social ou nome fantasia"
                  value={orgNome}
                  onChange={(e) => { setOrgNome(e.target.value); setErro("orgNome", ""); }}
                  onBlur={(e) => handleBlur("orgNome", e.target.value)}
                />
                {erros.orgNome && <span className={styles.erroCampo}>{erros.orgNome}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>CNPJ</label>
                <input
                  className={`${styles.input} ${erros.orgCnpj ? styles.inputErro : ""}`}
                  type="text"
                  placeholder="00.000.000/0001-00"
                  value={orgCnpj}
                  onChange={(e) => { setOrgCnpj(e.target.value); setErro("orgCnpj", ""); }}
                  onBlur={(e) => handleBlur("orgCnpj", e.target.value)}
                />
                {erros.orgCnpj && <span className={styles.erroCampo}>{erros.orgCnpj}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Email da organização</label>
                <input
                  className={`${styles.input} ${erros.orgEmail ? styles.inputErro : ""}`}
                  type="email"
                  placeholder="contato@empresa.com"
                  value={orgEmail}
                  onChange={(e) => { setOrgEmail(e.target.value); setErro("orgEmail", ""); }}
                  onBlur={(e) => handleBlur("orgEmail", e.target.value)}
                />
                {erros.orgEmail && <span className={styles.erroCampo}>{erros.orgEmail}</span>}
              </div>
            </>
          )}

          {erroServidor && <p className={styles.erro}>{erroServidor}</p>}

          <button type="submit" className={styles.cadastrarBtn} disabled={carregando}>
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <Link to="/login" className={styles.jaTemConta}>Já tem uma conta? Login</Link>
      </div>
    </div>
  );
}

export default Cadastro;
