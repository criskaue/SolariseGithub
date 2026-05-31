import axios from 'axios';

const api = axios.create({
  baseURL: 'https://solarise-backend-production.up.railway.app',
});

// Interceptor de requisição: injeta o token em todas as chamadas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de resposta: trata erros globais
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Token expirado ou inválido — limpa sessão e força novo login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    if (status === 500) {
      // Anexa mensagem amigável para os componentes usarem no catch
      error.friendlyMessage =
        'Erro interno no servidor. Tente novamente em alguns instantes.';
    }

    return Promise.reject(error);
  }
);

export default api;