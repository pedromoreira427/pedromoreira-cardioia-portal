import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { decodificarToken, loginFake, tokenValido } from "../services/authService.js";

const CHAVE_TOKEN = "cardioia_token";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // lê o token salvo só na primeira renderização
  const [token, setToken] = useState(() => {
    const salvo = localStorage.getItem(CHAVE_TOKEN);
    return tokenValido(salvo) ? salvo : null;
  });

  const login = useCallback(async (email, senha) => {
    const novoToken = await loginFake(email, senha);
    localStorage.setItem(CHAVE_TOKEN, novoToken);
    setToken(novoToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(CHAVE_TOKEN);
    setToken(null);
  }, []);

  // desloga sozinho quando o token expira
  useEffect(() => {
    if (!token) return;
    const restante = decodificarToken(token).exp - Date.now();
    const timer = setTimeout(logout, restante);
    return () => clearTimeout(timer);
  }, [token, logout]);

  const valor = useMemo(
    () => ({
      token,
      usuario: token ? decodificarToken(token) : null,
      autenticado: Boolean(token),
      login,
      logout,
    }),
    [token, login, logout]
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro de <AuthProvider>");
  return ctx;
}
