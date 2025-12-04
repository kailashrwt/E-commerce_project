import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBag } from "lucide-react";

const MyOrders = ({ theme }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:6060/api/order/my-orders", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setOrders(res.data.orders);
        } catch (err) {
            console.log("Error", err);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6"><ShoppingBag /> My Orders</h1>

            {orders.map((order) => (
                <div
                    key={order._id}
                    className="p-4 mb-4 rounded-lg shadow-lg border border-gray-200"
                >
                    <h2 className="font-semibold">
                        Order ID: <span className="text-blue-500">{order._id}</span>
                    </h2>
                    <p>Status: <b>{order.status}</b></p>
                    <p>Payment: <b>{order.paymentStatus}</b></p>
                    <p>Total: ₹{order.totalAmount}</p>

                    <div className="mt-3">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-center">
                                <img
                                    src={`http://localhost:6060${item.product.image}`}
                                    className="w-16 h-16 rounded"
                                />
                                <div>
                                    <p>{item.product.name}</p>
                                    <p>Qty: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {orders.length === 0 && (
                <p className="text-center text-gray-500">No orders yet.</p>
            )}
        </div>
    );
};

export default MyOrders;
