import { useState, useEffect } from 'react';
import './App.css';
import { Menu } from './components/Menu.jsx';
import { Orders } from './components/Orders.jsx';
import { LoginForm } from './components/LoginForm.jsx';
import { RegisterForm } from './components/RegisterForm.jsx';
import { Header } from './components/Header.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  // Importamos Navigate

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Recupera el estado de autenticación de localStorage al cargar la página
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem("isAuthenticated");
    if (storedAuthStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Guarda el estado de autenticación en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  return (
    <Router>
      <div>
        {isAuthenticated && (
          <Header 
            isAdmin={isAdmin} 
            setIsAdmin={setIsAdmin} 
            isAuthenticated={isAuthenticated} 
            setIsAuthenticated={setIsAuthenticated}
          />
        )}

        <Routes>
          {/* Ruta para el login (también estará disponible en "/login") */}
          <Route path="/" element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />  // Redirige a /dashboard si ya está autenticado
            ) : (
              <LoginForm
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            )
          } />

          <Route path="/login" element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />  // Redirige a /dashboard si ya está autenticado
            ) : (
              <LoginForm
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            )
          } />

          {/* Ruta para el dashboard (menú) */}
          <Route path="/dashboard" element={
            isAuthenticated ? (
              <div className='container mx-auto px-4'>
                {isAdmin ? (
                  <div>
                    <h1 className='text-3xl font-bold mb-4'>Pedidos Administrador</h1>
                    <Orders />
                  </div>
                ) : (
                  <Menu />
                )}
              </div>
            ) : (
              <Navigate to="/login" />  // Redirige al login si no está autenticado
            )
          } />

          {/* Ruta para el registro */}
          <Route path="/signup" element={
            <RegisterForm
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;