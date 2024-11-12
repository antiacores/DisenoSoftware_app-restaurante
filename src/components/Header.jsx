import React from 'react';

export const Header = ({ isAdmin, setIsAdmin, isAuthenticated }) => {
  const toggleAdmin = () => {
    setIsAdmin(!isAdmin); // Cambia el estado entre Admin y User
  };

  return (
    <header>
    <img
        src="src/images/logo.png"
        alt="Logo"
        className="header-logo-image"
    />
      <h1>La Casa del Machete</h1>
      {isAuthenticated && (
        <button onClick={toggleAdmin}>
          {isAdmin ? "User" : "Admin"}
        </button>
      )}
    </header>
  );
};