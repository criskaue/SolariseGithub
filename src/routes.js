import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro"
import PageNotFound from "./pages/PageNotFound";
import Geracao from './pages/Geracao';
import PainelInstaladora from './pages/PainelInstaladora';
import HomeLocadora from "./pages/HomeLocadora";
import HomeInstaladora from "./pages/HomeInstaladora";
import PrivateRoute from "./components/PrivateRoute";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                {/* Raiz redireciona para login */}
                <Route path="/" element={ <Navigate to="/login" replace /> } />

                {/* Rotas públicas */}
                <Route path="/login" element={ <Login /> } />
                <Route path="/cadastro" element={ <Cadastro /> } />

                {/* Rotas privadas */}
                <Route path="/homelocadora"    element={ <PrivateRoute><HomeLocadora /></PrivateRoute> } />
                <Route path="/homeinstaladora" element={ <PrivateRoute><HomeInstaladora /></PrivateRoute> } />
                <Route path="/geracao"         element={ <PrivateRoute><Geracao /></PrivateRoute> } />
                <Route path="/painel"          element={ <PrivateRoute><PainelInstaladora /></PrivateRoute> } />

                <Route path="*" element={ <PageNotFound /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;