import RiscoBadge from "./RiscoBadge.jsx";
import styles from "./PacienteCard.module.css";

export default function PacienteCard({ paciente }) {
  return (
    <article className={styles.card}>
      <header className={styles.topo}>
        <h3>{paciente.nome}</h3>
        <RiscoBadge risco={paciente.risco} />
      </header>
      <p className={styles.condicao}>{paciente.condicao}</p>
      <dl className={styles.dados}>
        <div><dt>Idade</dt><dd>{paciente.idade} anos</dd></div>
        <div><dt>FC</dt><dd>{paciente.frequenciaCardiaca} bpm</dd></div>
        <div><dt>PA</dt><dd>{paciente.pressao}</dd></div>
        <div><dt>Cidade</dt><dd>{paciente.cidade}</dd></div>
      </dl>
      <footer className={styles.contato}>{paciente.email} · {paciente.telefone}</footer>
    </article>
  );
}
