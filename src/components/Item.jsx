import React from 'react';

export const Item = ({ name, price, description, onAddToCart }) => {
  return (
    <div>
        <h2>{name}</h2>
        <h2>${price}</h2>
        <h4>{description}</h4>
    </div>
  );
};