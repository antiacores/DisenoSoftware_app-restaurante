import React, { useState, useEffect } from 'react';
import { getMenu } from '../services/menuApi';
import { Cart } from './Cart';

export const Menu = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener los platillos desde el API
  useEffect(() => {
    getMenu()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Agregar un platillo al carrito
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Eliminar un platillo del carrito
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.map(item => 
      item.id === itemId 
      ? { ...item, quantity: item.quantity - 1 } 
      : item
    ).filter(item => item.quantity > 0)); // Filtra solo los items con cantidad mayor a 0
  };

  return (
    <div className="container">
      <h1>Menú</h1>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="menu">
  {items.map((item) => (
    <div key={item.id} className="menu-item">
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <div className="price">${item.price}</div>
      <div className="button-container">
        <button className="remove-button" onClick={() => removeFromCart(item.id)}>-</button>
        <button className="add-button" onClick={() => addToCart(item)}>+</button>
      </div>
    </div>
  ))}
</div>
      )}
      <Cart cartItems={cart} setCart={setCart} removeFromCart={removeFromCart} />
    </div>
  );
};