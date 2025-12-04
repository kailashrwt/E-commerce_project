import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListOrdered, ListOrderedIcon } from "lucide-react";

const MangeOrders = ({ theme }) => {
  const [orders, setOrders] = useState([]);
  const isDark = theme === "dark";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:6060/api/admin/order");
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.log("Order Fetch Error", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:6060/api/admin/order/${id}`, { status });
      alert("Status updated");
      fetchOrders();
    } catch (err) {
      alert("Failed to update");
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await axios.delete(`http://localhost:6060/api/admin/order/${id}`);
      alert("Order deleted");
      setOrders(orders.filter((o) => o._id !== id));
    } catch (err) {
      alert("Failed to delete order");
    }
  };

  return (
    <div
      className="p-4 sm:p-6 rounded-xl shadow-xl"
      style={{
        background: isDark ? "#0f172a" : "#ffffff",
        color: isDark ? "#f8fafc" : "#0f172a",
        border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
      }}
    >
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        <ListOrdered /> Manage Orders
      </h1>

      {/* RESPONSIVE TABLE WRAPPER */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-[800px] w-full border-collapse">
          <thead>
            <tr
              style={{
                background: isDark ? "#1e293b" : "#f1f5f9",
              }}
            >
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b"
                style={{ borderColor: isDark ? "#334155" : "#e2e8f0" }}
              >
                <td className="p-3 break-words max-w-[150px]">{order._id}</td>

                <td className="p-3">
                  <div className="font-medium">
                    {order.user?.firstName} {order.user?.lastName}
                  </div>
                  <div className="text-sm text-gray-400">{order.user?.email}</div>
                </td>

                <td className="p-3">
                  {order.items.map((i, index) => (
                    <div key={index} className="text-sm">
                      {i.product?.name} × {i.quantity}
                    </div>
                  ))}
                </td>

                <td className="p-3 font-bold text-green-500">
                  ₹{order.totalAmount}
                </td>

                <td className="p-3">{order.status}</td>

                <td className="p-3 text-center">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center">

                    {/* STATUS SELECT */}
                    <select
                      className="px-2 py-1 rounded w-full sm:w-auto"
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      style={{
                        background: isDark ? "#0F172A" : "#ffffff",
                        color: isDark ? "#F8FAFC" : "#0F172A",
                        border: `1px solid ${isDark ? "#334155" : "#CBD5E1"}`,
                        cursor: "pointer",
                      }}
                    >
                      <option>Pending</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-full sm:w-auto"
                    >
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MangeOrders;
