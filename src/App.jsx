import { useState, useEffect } from 'react';
import './App.css';
import { Menu } from './components/Menu.jsx';
import { Orders } from './components/Orders.jsx';
import { LoginForm } from './components/LoginForm.jsx';
import { RegisterForm } from './components/RegisterForm.jsx';  // Asegúrate de importar el formulario de registro
import { Header } from './components/Header.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Importar el Router

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
    <Router>  {/* Agregamos Router para manejar las rutas */}
      <div>
        {isAuthenticated && (
          <Header 
            isAdmin={isAdmin} 
            setIsAdmin={setIsAdmin} 
            isAuthenticated={isAuthenticated} 
            setIsAuthenticated={setIsAuthenticated}
          />
        )}

        <Routes> {/* Definimos las rutas dentro de Routes */}
          {/* Ruta para el inicio de sesión */}
          <Route path="/login" element={
            <LoginForm
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          } />

          {/* Ruta para el registro */}
          <Route path="/signup" element={
            <RegisterForm
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          } />

          {/* Ruta principal, cuando está autenticado */}
          <Route path="/" element={
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
              <LoginForm
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;