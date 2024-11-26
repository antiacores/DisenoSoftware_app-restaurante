import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/orderService';

export const Orders = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const history = await getOrders();
                console.log("Orders:", history);
                setOrderHistory(history);
            } catch (error) {
                console.error("Error al obtener el historial de órdenes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, []);

    const formatDate = (timestamp) => {
        if (timestamp && timestamp.toDate) {
            const date = timestamp.toDate();
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        }
        return "Fecha no disponible";
    };

    return (
        <div>
            <h1>Orders</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {orderHistory.length > 0 ? (
                        orderHistory.map((order, index) => (
                            <div key={order.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
                                <h2>Orden {index + 1}</h2>
                                <h4>{formatDate(order.timestamp)}</h4>
                                <div>
                                        {order.items && Array.isArray(order.items) ? (
                                            order.items.map((item, itemIndex) => (
                                                <div key={itemIndex}>
                                                    {item.name} x{item.quantity} - ${item.price * item.quantity}
                                                </div>
                                            ))
                                        ) : (
                                            <p>Datos no disponibles</p>
                                        )}
                                </div>
                                <p><strong>Tipo de Pago:</strong> {order.payment}</p>
                                <p><strong>Total: ${order.total}</strong></p>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron órdenes.</p>
                    )}
                </div>
            )}
        </div>
    );
};