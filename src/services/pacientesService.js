// Busca usuários na API pública JSONPlaceholder e transforma em "pacientes".
// Os dados clínicos são simulados de forma determinística (mesmo id = mesmos dados),
// para a tela não mudar a cada recarga. Se a API estiver fora, usa o JSON local.

const API_URL = "https://jsonplaceholder.typicode.com/users";
const RISCOS = ["baixo", "moderado", "alto"];
const CONDICOES = ["Hipertensão", "Arritmia", "Insuficiência cardíaca", "Pós-infarto", "Check-up", "Angina"];

function simularDadosClinicos(id) {
  const idade = 35 + ((id * 7) % 45);
  return {
    idade,
    condicao: CONDICOES[id % CONDICOES.length],
    risco: RISCOS[(id * 5) % 3],
    frequenciaCardiaca: 60 + ((id * 13) % 45),
    pressao: `${110 + ((id * 9) % 50)}/${70 + ((id * 3) % 25)}`,
  };
}

function paraPaciente(usuario) {
  return {
    id: usuario.id,
    nome: usuario.name,
    email: usuario.email,
    telefone: usuario.phone,
    cidade: usuario.address?.city ?? "",
    ...simularDadosClinicos(usuario.id),
  };
}

export async function listarPacientes() {
  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const usuarios = await resp.json();
    return { pacientes: usuarios.map(paraPaciente), fonte: "JSONPlaceholder" };
  } catch (erro) {
    console.warn("API indisponível, usando base local:", erro.message);
    const resp = await fetch("/data/pacientes.json");
    const usuarios = await resp.json();
    return { pacientes: usuarios.map(paraPaciente), fonte: "base local" };
  }
}
