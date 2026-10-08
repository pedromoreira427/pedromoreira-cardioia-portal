import { useMemo, useState } from "react";
import Loading from "../components/Loading.jsx";
import PacienteCard from "../components/PacienteCard.jsx";
import { usePacientes } from "../services/usePacientes.js";
import pagina from "./Pagina.module.css";

export default function Pacientes() {
  const { pacientes, carregando, erro, fonte } = usePacientes();
  const [busca, setBusca] = useState("");
  const [risco, setRisco] = useState("todos");

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return pacientes.filter(
      (p) =>
        (risco === "todos" || p.risco === risco) &&
        (p.nome.toLowerCase().includes(termo) || p.condicao.toLowerCase().includes(termo))
    );
  }, [pacientes, busca, risco]);

  return (
    <>
      <div className={pagina.cabecalho}>
        <h1>Pacientes</h1>
        <p>{carregando ? "Buscando dados..." : `${filtrados.length} de ${pacientes.length} pacientes`}</p>
      </div>

      <div className={pagina.filtros}>
        <input
          placeholder="Buscar por nome ou condição"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          aria-label="Buscar paciente"
        />
        <select value={risco} onChange={(e) => setRisco(e.target.value)} aria-label="Filtrar por risco">
          <option value="todos">Todos os riscos</option>
          <option value="alto">Alto</option>
          <option value="moderado">Moderado</option>
          <option value="baixo">Baixo</option>
        </select>
      </div>

      {carregando && <Loading />}
      {erro && <p className={pagina.erro}>Erro: {erro}</p>}
      {!carregando && filtrados.length === 0 && <p className={pagina.vazio}>Nenhum paciente encontrado.</p>}

      <div className={pagina.grade}>
        {filtrados.map((p) => (
          <PacienteCard key={p.id} paciente={p} />
        ))}
      </div>
      {fonte && <p className={pagina.fonte}>Dados de: {fonte} (informações clínicas simuladas)</p>}
    </>
  );
}
