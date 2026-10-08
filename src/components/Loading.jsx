import styles from "./Loading.module.css";

export default function Loading({ texto = "Carregando..." }) {
  return (
    <div className={styles.wrap} role="status">
      <span className={styles.spinner} />
      {texto}
    </div>
  );
}
