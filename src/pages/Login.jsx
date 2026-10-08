import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { USUARIO_DEMO } from "../services/authService.js";
import styles from "./Login.module.css";

export default function Login() {
  const { login, autenticado } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.from ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  if (autenticado) return <Navigate to={destino} replace />;

  async function entrar(e) {
    e.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      await login(email, senha);
      navigate(destino, { replace: true });
    } catch (err) {
      setErro(err.message);
    } finally {
      setEnviando(false);
    }
  }

  function preencherDemo() {
    setEmail(USUARIO_DEMO.email);
    setSenha(USUARIO_DEMO.senha);
  }

  return (
    <div className={styles.fundo}>
      <form className={styles.card} onSubmit={entrar}>
        <h1 className={styles.logo}>♥ CardioIA</h1>
        <p className={styles.sub}>Portal de diagnóstico em cardiologia</p>

        <label className={styles.campo}>
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
        </label>
        <label className={styles.campo}>
          Senha
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required autoComplete="current-password" />
        </label>

        {erro && <p className={styles.erro}>{erro}</p>}

        <button className={styles.botao} disabled={enviando}>
          {enviando ? "Entrando..." : "Entrar"}
        </button>

        <button type="button" className={styles.demo} onClick={preencherDemo}>
          Usar conta de demonstração
        </button>
        <small className={styles.dica}>
          {USUARIO_DEMO.email} / {USUARIO_DEMO.senha}
        </small>
      </form>
    </div>
  );
}
