import { useState, useEffect } from "react";
import AppRoutes from "./routes";
import Splash from "./pages/Splash";
import TermsModal from "./components/TermsModal";
import { AuthProvider } from "./contexts/AuthContext";

const TERMOS_ACEITOS_KEY = "solarise_termos_aceitos";

function App() {
  const [splashVisivel, setSplashVisivel] = useState(true);
  const [termosVisivel, setTermosVisivel] = useState(
    () => localStorage.getItem(TERMOS_ACEITOS_KEY) !== "true"
  );

  useEffect(() => {
    const timer = setTimeout(() => setSplashVisivel(false), 3000); // 3s
    return () => clearTimeout(timer);
  }, []);

  function aceitarTermos() {
    localStorage.setItem(TERMOS_ACEITOS_KEY, "true");
    setTermosVisivel(false);
  }

  return (
    <AuthProvider>
      {splashVisivel && <Splash />}
      {!splashVisivel && termosVisivel && <TermsModal onAccept={aceitarTermos} />}
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
