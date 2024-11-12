import React from 'react';

export const Header = ({ isAdmin, setIsAdmin, isAuthenticated, setIsAuthenticated }) => {
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
          <button onClick={handleLogout}>
            Cerrar sesión
          </button>
        </>
      )}
    </header>
  );
};