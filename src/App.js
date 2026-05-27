import { useState, useEffect } from "react";
import AppRoutes from "./routes";
import Splash from "./pages/Splash";

function App() {
  const [splashVisivel, setSplashVisivel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setSplashVisivel(false), 3000); // 3s
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {splashVisivel && <Splash />}
      <AppRoutes />
    </>
  );
}

export default App;