import React from 'react';

export const Item = ({ name, price, description, onAddToCart }) => {
  return (
    <div>
        <h2>{name} - ${price}</h2>
        <h3>{description}</h3>
        <button onClick={() => onAddToCart({ name, price, quantity: 1 })}>
            Agregar al carrito
        </button>
    </div>
  );
};