# CardioIA Portal (Fase 2, Ir Além 1)

Interface web do CardioIA feita em **React + Vite**. Simula a rotina de um portal de diagnóstico em cardiologia: login, lista de pacientes, agendamento de consultas e um painel com métricas. Não tem back-end; os dados são simulados.

## 👨‍🎓 Integrante

| Nome completo | RM |
|---|---|
| Pedro Gustavo França Moreira | 568262 |

## 👩‍🏫 Professores

- Tutor(a): Sabrina Otoni
- Coordenador(a): André Godoi


## 🎥 Vídeo de demonstração

**Link (YouTube, não listado):** COLAR_LINK_AQUI

## ✨ Funcionalidades

| Requisito | Onde está |
|---|---|
| Autenticação simulada com Context API e JWT fake no localStorage | `src/contexts/AuthContext.jsx`, `src/services/authService.js` |
| Proteção de rotas (só mostra dados com usuário logado) | `src/components/ProtectedRoute.jsx`, `src/App.jsx` |
| Listagem de pacientes via API fake (JSONPlaceholder), com fallback para JSON local | `src/services/pacientesService.js`, `src/services/usePacientes.js`, `src/pages/Pacientes.jsx` |
| Formulário de agendamento com `useState` e `useReducer` | `src/pages/Agendamento.jsx`, `src/contexts/ConsultasContext.jsx` |
| Dashboard com contagem de pacientes e consultas | `src/pages/Dashboard.jsx` |
| Estilização com CSS Modules, responsiva (menu hambúrguer no celular) | arquivos `*.module.css` |

**Hooks usados:** `useState`, `useEffect`, `useContext`, `useReducer`, `useMemo`, `useCallback` e um hook customizado (`usePacientes`).

## 🔐 Login de demonstração

- E-mail: `medico@cardioia.com`
- Senha: `123456`

(Tem um botão "Usar conta de demonstração" na tela de login.)

O token gerado tem formato de JWT (`header.payload.assinatura`) com expiração de 1 hora. Ao recarregar a página, o token salvo é lido e validado; se expirou, o usuário volta para o login.

## 📁 Estrutura

```
src/
├── components/   # Navbar, Layout, ProtectedRoute, StatCard, PacienteCard, RiscoBadge, Loading
├── contexts/     # AuthContext (login/logout/token) e ConsultasContext (useReducer)
├── pages/        # Login, Dashboard, Pacientes, Agendamento, NotFound
├── services/     # authService (JWT fake), pacientesService (API), usePacientes (hook), datas
├── styles/       # variáveis e estilos globais
├── App.jsx       # rotas
└── main.jsx      # providers e BrowserRouter
public/data/pacientes.json   # base local usada se a API estiver fora do ar
```

## 🔧 Instalação e execução

**Sem instalar nada:** [abrir no StackBlitz](https://stackblitz.com/github/pedromoreira427/pedromoreira-cardioia-portal) (roda no navegador).

**Local:** precisa do [Node.js](https://nodejs.org/) 20 ou superior.

```bash
git clone https://github.com/pedromoreira427/pedromoreira-cardioia-portal.git
cd pedromoreira-cardioia-portal
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

Para gerar a versão de produção: `npm run build` e depois `npm run preview`.

## ⚠️ Observações

- Dados clínicos (idade, risco, pressão, frequência) são **simulados** a partir do id do usuário da API.
- As consultas ficam salvas no localStorage do navegador.
- Autenticação fake serve só para estudo. Em produção, o token é emitido e validado pelo servidor.
