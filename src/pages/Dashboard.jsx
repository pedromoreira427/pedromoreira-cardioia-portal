import { formatarData, hojeLocal } from "../services/datas.js";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import StatCard from "../components/StatCard.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useConsultas } from "../contexts/ConsultasContext.jsx";
import { usePacientes } from "../services/usePacientes.js";
import pagina from "./Pagina.module.css";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { usuario } = useAuth();
  const { pacientes, carregando, erro, fonte } = usePacientes();
  const { consultas } = useConsultas();

  // useMemo: só recalcula quando a lista muda
  const metricas = useMemo(() => {
    const hoje = hojeLocal();
    const ativas = consultas.filter((c) => c.status === "agendada");
    const porRisco = { baixo: 0, moderado: 0, alto: 0 };
    pacientes.forEach((p) => porRisco[p.risco]++);
    return {
      agendadas: ativas.length,
      hoje: ativas.filter((c) => c.data === hoje).length,
      proximas: ativas.filter((c) => c.data >= hoje).sort((a, b) => (a.data + a.hora).localeCompare(b.data + b.hora)).slice(0, 5),
      porRisco,
    };
  }, [pacientes, consultas]);

  if (carregando) return <Loading texto="Carregando painel..." />;
  if (erro) return <p className={pagina.erro}>Erro ao carregar: {erro}</p>;

  return (
    <>
      <div className={pagina.cabecalho}>
        <h1>Olá, {usuario?.nome?.split(" ").slice(0, 2).join(" ")}</h1>
        <p>Resumo do dia no CardioIA</p>
      </div>

      <div className={pagina.grade}>
        <StatCard titulo="Pacientes" valor={pacientes.length} detalhe={`fonte: ${fonte}`} />
        <StatCard titulo="Consultas agendadas" valor={metricas.agendadas} />
        <StatCard titulo="Consultas hoje" valor={metricas.hoje} />
        <StatCard titulo="Pacientes de alto risco" valor={metricas.porRisco.alto} destaque />
      </div>

      <div className={styles.duasColunas}>
        <section className={pagina.secao}>
          <h2>Pacientes por risco</h2>
          {Object.entries(metricas.porRisco).map(([risco, qtd]) => (
            <div key={risco} className={styles.barraLinha}>
              <span className={styles.rotulo}>{risco}</span>
              <div className={styles.trilho}>
                <div
                  className={`${styles.barra} ${styles[risco]}`}
                  style={{ width: `${pacientes.length ? (qtd / pacientes.length) * 100 : 0}%` }}
                />
              </div>
              <strong>{qtd}</strong>
            </div>
          ))}
        </section>

        <section className={pagina.secao}>
          <h2>Próximas consultas</h2>
          {metricas.proximas.length === 0 ? (
            <p className={pagina.vazio}>
              Nenhuma consulta agendada. <Link to="/agendamento">Agendar agora</Link>
            </p>
          ) : (
            <ul className={styles.lista}>
              {metricas.proximas.map((c) => (
                <li key={c.id}>
                  <strong>{c.pacienteNome}</strong>
                  <span>{formatarData(c.data)} às {c.hora} · {c.tipo}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
