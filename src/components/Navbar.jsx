import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import styles from "./Navbar.module.css";

const LINKS = [
  { to: "/dashboard", texto: "Dashboard" },
  { to: "/pacientes", texto: "Pacientes" },
  { to: "/agendamento", texto: "Agendamento" },
];

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  function sair() {
    logout();
    navigate("/login");
  }

  return (
    <header className={styles.barra}>
      <div className={styles.interno}>
        <span className={styles.logo}>♥ CardioIA</span>

        <button
          className={styles.hamburguer}
          onClick={() => setMenuAberto((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={menuAberto}
        >
          ☰
        </button>

        <nav className={`${styles.nav} ${menuAberto ? styles.aberto : ""}`}>
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMenuAberto(false)}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.ativo : ""}`}
            >
              {l.texto}
            </NavLink>
          ))}
          <div className={styles.usuario}>
            <span>{usuario?.nome}</span>
            <button className={styles.sair} onClick={sair}>Sair</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
