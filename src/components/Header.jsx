import React, { useState } from 'react';

export const Header = ({ isAdmin, setIsAdmin, isAuthenticated, setIsAuthenticated }) => {
  const [isHovered, setIsHovered] = useState(false); // Estado para el hover

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin); // Cambia el estado entre Admin y User
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Cambia el estado de autenticación
    setIsAdmin(false); // Resetea el estado de admin
    localStorage.removeItem('isAuthenticated'); // Limpia la sesión del localStorage
  };

  return (
    <header>
      <div className="navbar-left">
        <img
          src="src/images/logo.png"
          alt="Logo"
          className="header-logo-image"
        />
        <h1>La Casa del Machete</h1>
      </div>

      {isAuthenticated && (
        <>
          <button onClick={toggleAdmin}>
            {isAdmin ? 'User' : 'Admin'}
          </button>
          {/* Aquí reemplazamos el botón con las imágenes */}
          <div
            className="logout-container"
            onMouseEnter={() => setIsHovered(true)}  // Detecta cuando el mouse entra
            onMouseLeave={() => setIsHovered(false)} // Detecta cuando el mouse sale
            onClick={handleLogout} // Maneja el clic en la imagen
          >
            <img
              src={isHovered ? 'src/images/logout-hover.png' : 'src/images/logout.png'}
              alt="Cerrar sesión"
              className="logout-image"
            />
          </div>
          
        </>
      )}
    </header>
  );
};