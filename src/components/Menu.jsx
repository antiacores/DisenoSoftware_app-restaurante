import React, { useState, useEffect } from 'react';
import { Item } from './Item';
import { getMenu } from '../services/menuApi';
import { Cart } from './Cart';

export const Menu = () => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.name === item.name);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.name === item.name
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, item];
            }
        });
    };

    return (
        <>
            <h1>Menu</h1>
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                items.map((item) => (
                    <Item
                        key={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        onAddToCart={addToCart}
                    />
                ))
            )}
            <Cart cartItems={cart} setCart={setCart} />
        </>
    );
};