import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>404</h1>
      <p>Página não encontrada.</p>
      <Link to="/dashboard">Voltar para o início</Link>
    </div>
  );
}
