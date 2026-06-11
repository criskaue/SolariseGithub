import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ao iniciar o app, verifica se já existe um token salvo e carrega o perfil
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/profile')
        .then(({ data }) => setUser(data))
        .catch((err) => {
          // Só remove o token se for realmente erro de autenticação (401 é tratado
          // pelo interceptor do api.js; aqui chegam erros 4xx diferentes ou rede)
          if (err.response?.status === 401) {
            localStorage.removeItem('token');
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  async function login(email, password) {
    // A API de login usa form-urlencoded (padrão OAuth2)
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    const { data } = await api.post('/auth/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    localStorage.setItem('token', data.access_token);

    // Após salvar o token, busca os dados do perfil
    const { data: profile } = await api.get('/auth/profile');
    setUser(profile);
    return profile;
  }

  async function register(userData) {
    // Cadastro envia JSON com todos os dados do usuário e organização
    await api.post('/auth/register', userData);
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto em qualquer componente
export function useAuth() {
  return useContext(AuthContext);
}
