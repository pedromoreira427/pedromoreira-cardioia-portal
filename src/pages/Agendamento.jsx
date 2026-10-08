import { formatarData, hojeLocal } from "../services/datas.js";
import { useReducer, useState } from "react";
import Loading from "../components/Loading.jsx";
import { useConsultas } from "../contexts/ConsultasContext.jsx";
import { usePacientes } from "../services/usePacientes.js";
import pagina from "./Pagina.module.css";
import styles from "./Agendamento.module.css";

const FORM_INICIAL = { pacienteId: "", data: "", hora: "", tipo: "Consulta", observacoes: "" };

// useReducer para o estado do formulário (vários campos que mudam juntos)
function formReducer(estado, acao) {
  switch (acao.type) {
    case "CAMPO":
      return { ...estado, [acao.campo]: acao.valor };
    case "LIMPAR":
      return FORM_INICIAL;
    default:
      return estado;
  }
}

function validar(form) {
  const erros = {};
  const hoje = hojeLocal();
  if (!form.pacienteId) erros.pacienteId = "Escolha um paciente";
  if (!form.data) erros.data = "Informe a data";
  else if (form.data < hoje) erros.data = "A data não pode estar no passado";
  if (!form.hora) erros.hora = "Informe o horário";
  return erros;
}

export default function Agendamento() {
  const { pacientes, carregando } = usePacientes();
  const { consultas, dispatch } = useConsultas();
  const [form, dispatchForm] = useReducer(formReducer, FORM_INICIAL);
  // useState para coisas simples e independentes
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");

  const mudar = (campo) => (e) => dispatchForm({ type: "CAMPO", campo, valor: e.target.value });

  function agendar(e) {
    e.preventDefault();
    const encontrados = validar(form);
    setErros(encontrados);
    if (Object.keys(encontrados).length) return;

    const conflito = consultas.some((c) => c.status === "agendada" && c.data === form.data && c.hora === form.hora);
    if (conflito) {
      setErros({ hora: "Já existe consulta nesse horário" });
      return;
    }

    const paciente = pacientes.find((p) => String(p.id) === form.pacienteId);
    dispatch({ type: "AGENDAR", payload: { ...form, pacienteNome: paciente.nome } });
    dispatchForm({ type: "LIMPAR" });
    setMensagem(`Consulta de ${paciente.nome} agendada!`);
    setTimeout(() => setMensagem(""), 3000);
  }

  const ordenadas = [...consultas].sort((a, b) => (a.data + a.hora).localeCompare(b.data + b.hora));

  return (
    <>
      <div className={pagina.cabecalho}>
        <h1>Agendamento</h1>
        <p>Marque consultas e exames para os pacientes</p>
      </div>

      <div className={styles.layout}>
        <form className={pagina.secao} onSubmit={agendar} noValidate>
          <h2>Nova consulta</h2>
          {carregando ? (
            <Loading texto="Carregando pacientes..." />
          ) : (
            <>
              <label className={styles.campo}>
                Paciente
                <select value={form.pacienteId} onChange={mudar("pacienteId")}>
                  <option value="">Selecione...</option>
                  {pacientes.map((p) => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
                {erros.pacienteId && <small className={styles.erro}>{erros.pacienteId}</small>}
              </label>

              <div className={styles.linha}>
                <label className={styles.campo}>
                  Data
                  <input type="date" value={form.data} onChange={mudar("data")} />
                  {erros.data && <small className={styles.erro}>{erros.data}</small>}
                </label>
                <label className={styles.campo}>
                  Hora
                  <input type="time" value={form.hora} onChange={mudar("hora")} />
                  {erros.hora && <small className={styles.erro}>{erros.hora}</small>}
                </label>
              </div>

              <label className={styles.campo}>
                Tipo
                <select value={form.tipo} onChange={mudar("tipo")}>
                  <option>Consulta</option>
                  <option>Retorno</option>
                  <option>Eletrocardiograma</option>
                  <option>Ecocardiograma</option>
                  <option>Teste ergométrico</option>
                </select>
              </label>

              <label className={styles.campo}>
                Observações
                <textarea rows={3} value={form.observacoes} onChange={mudar("observacoes")} />
              </label>

              <button className={styles.botao}>Agendar</button>
              {mensagem && <p className={styles.sucesso}>{mensagem}</p>}
            </>
          )}
        </form>

        <section className={pagina.secao}>
          <h2>Consultas ({consultas.filter((c) => c.status === "agendada").length} ativas)</h2>
          {ordenadas.length === 0 && <p className={pagina.vazio}>Nenhuma consulta ainda.</p>}
          <ul className={styles.lista}>
            {ordenadas.map((c) => (
              <li key={c.id} className={c.status === "cancelada" ? styles.cancelada : ""}>
                <div>
                  <strong>{c.pacienteNome}</strong>
                  <span>{formatarData(c.data)} às {c.hora} · {c.tipo}</span>
                  {c.observacoes && <em>{c.observacoes}</em>}
                </div>
                {c.status === "agendada" ? (
                  <button onClick={() => dispatch({ type: "CANCELAR", id: c.id })}>Cancelar</button>
                ) : (
                  <button onClick={() => dispatch({ type: "REMOVER", id: c.id })}>Remover</button>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
