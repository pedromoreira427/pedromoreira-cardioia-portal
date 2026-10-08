import { useEffect, useState } from "react";
import { listarPacientes } from "./pacientesService.js";

// hook customizado: centraliza carregamento, erro e dados dos pacientes
export function usePacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [fonte, setFonte] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true; // evita atualizar estado se o componente sair da tela
    listarPacientes()
      .then(({ pacientes, fonte }) => {
        if (!ativo) return;
        setPacientes(pacientes);
        setFonte(fonte);
      })
      .catch((e) => ativo && setErro(e.message))
      .finally(() => ativo && setCarregando(false));
    return () => {
      ativo = false;
    };
  }, []);

  return { pacientes, fonte, carregando, erro };
}
