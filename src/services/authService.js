// JWT "fake": tem o mesmo formato de um JWT real (header.payload.assinatura),
// mas a assinatura é inventada. Serve só para simular o fluxo de autenticação.
// Em produção o token viria do back-end e seria validado lá.

const USUARIO_DEMO = {
  email: "medico@cardioia.com",
  senha: "123456",
  nome: "Dra. Helena Prado",
  crm: "CRM-GO 12345",
};

const DURACAO_MS = 60 * 60 * 1000; // 1 hora

const base64Url = (obj) =>
  btoa(unescape(encodeURIComponent(JSON.stringify(obj))))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

function gerarTokenFake(usuario) {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    sub: usuario.email,
    nome: usuario.nome,
    crm: usuario.crm,
    iat: Date.now(),
    exp: Date.now() + DURACAO_MS,
  };
  const assinatura = Math.random().toString(36).slice(2);
  return `${base64Url(header)}.${base64Url(payload)}.${assinatura}`;
}

export function decodificarToken(token) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeURIComponent(escape(atob(payload))));
  } catch {
    return null;
  }
}

export function tokenValido(token) {
  const dados = token && decodificarToken(token);
  return Boolean(dados && dados.exp > Date.now());
}

// simula a chamada de login com um pequeno atraso de rede
export function loginFake(email, senha) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email.trim().toLowerCase() === USUARIO_DEMO.email && senha === USUARIO_DEMO.senha) {
        resolve(gerarTokenFake(USUARIO_DEMO));
      } else {
        reject(new Error("E-mail ou senha inválidos"));
      }
    }, 600);
  });
}

export { USUARIO_DEMO };
