import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Protege rotas que exigem login: redireciona para /login se não autenticado
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default PrivateRoute;
