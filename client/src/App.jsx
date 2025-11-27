import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./MainRouter";
import Footer from "./components/Footer";
import Background from "./components/Background";

const App = () => {
  return (
    <Router>
      {/* Fondo de partículas */}
      <Background />

      {/* Contenido principal */}
      <div style={{ position: "relative", zIndex: 1 }}>
      <MainRouter />
     
       {/* Footer aquí puede ser sólido o transparente */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
