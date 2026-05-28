import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro"
import PageNotFound from "./pages/PageNotFound";
import Splash from "./pages/Splash";
import Geracao from './pages/Geracao';
import PainelInstaladora from './pages/PainelInstaladora';

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home /> } ></Route>
                <Route path="/login" element={ <Login /> } ></Route>
                <Route path="/cadastro" element={ <Cadastro /> } ></Route>
                <Route path="*" element={ <PageNotFound /> } ></Route>
                <Route path="/geracao" element={<Geracao />} />
                <Route path="/painel" element={<PainelInstaladora />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;