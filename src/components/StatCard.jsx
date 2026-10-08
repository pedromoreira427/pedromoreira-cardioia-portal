import styles from "./StatCard.module.css";

export default function StatCard({ titulo, valor, detalhe, destaque = false }) {
  return (
    <div className={`${styles.card} ${destaque ? styles.destaque : ""}`}>
      <span className={styles.titulo}>{titulo}</span>
      <strong className={styles.valor}>{valor}</strong>
      {detalhe && <span className={styles.detalhe}>{detalhe}</span>}
    </div>
  );
}
