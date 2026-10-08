import { createContext, useContext, useEffect, useReducer } from "react";

const CHAVE = "cardioia_consultas";
const ConsultasContext = createContext(null);

// reducer: todas as mudanças na lista de consultas passam por aqui
function consultasReducer(estado, acao) {
  switch (acao.type) {
    case "AGENDAR":
      return [...estado, { ...acao.payload, id: crypto.randomUUID(), status: "agendada" }];
    case "CANCELAR":
      return estado.map((c) => (c.id === acao.id ? { ...c, status: "cancelada" } : c));
    case "REMOVER":
      return estado.filter((c) => c.id !== acao.id);
    default:
      return estado;
  }
}

function carregarSalvas() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE)) ?? [];
  } catch {
    return [];
  }
}

export function ConsultasProvider({ children }) {
  const [consultas, dispatch] = useReducer(consultasReducer, [], carregarSalvas);

  useEffect(() => {
    localStorage.setItem(CHAVE, JSON.stringify(consultas));
  }, [consultas]);

  return (
    <ConsultasContext.Provider value={{ consultas, dispatch }}>{children}</ConsultasContext.Provider>
  );
}

export function useConsultas() {
  const ctx = useContext(ConsultasContext);
  if (!ctx) throw new Error("useConsultas precisa estar dentro de <ConsultasProvider>");
  return ctx;
}
