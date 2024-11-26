import React, { useState } from 'react';
import { createOrder } from '../services/orderService';

export const Cart = ({ cartItems = [], setCart, onOrderAdded }) => {
    const [paymentMethod, setPaymentMethod] = useState('cash'); // Estado para el método de pago

    const handleCheckout = async () => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const orderData = {
            items: cartItems,
            total: total,
            payment: paymentMethod,
            timestamp: new Date(),
        };

        try {
            await createOrder(orderData); // Añadir la orden a Firestore
            alert(`Orden pagada con ${paymentMethod} y añadida al historial`);
            setCart([]); // Limpiar carrito
            onOrderAdded(); // Llamar a la función para refrescar el historial
        } catch (error) {
            console.error("Error al añadir la orden:", error);
        }
    };

    return (
        <div>
            <h1>Carrito de Compras</h1>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            {item.name} x{item.quantity} - ${item.price * item.quantity}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Carrito vacío, selecciona algún alimento para comenzar a comprar</p>
            )}
            <p><strong>Total:</strong> ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
            <label htmlFor="payment-method">Método de pago:</label>
            <select 
                id="payment-method" 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)}
            >
                <option value="tarjeta">tarjeta</option>
                <option value="cash">cash</option>
            </select>
            <button onClick={handleCheckout}>Pagar Carrito</button>
        </div>
    );
};