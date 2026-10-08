import styles from "./RiscoBadge.module.css";

export default function RiscoBadge({ risco }) {
  return <span className={`${styles.badge} ${styles[risco]}`}>risco {risco}</span>;
}
