import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.conteudo}>
        <Outlet />
      </main>
    </div>
  );
}
