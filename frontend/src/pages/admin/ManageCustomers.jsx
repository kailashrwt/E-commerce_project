import React, { useEffect, useState } from "react";
import axios from "axios";
import { AvatarIcon } from "../../components/Icons";

const ManageCustomers = ({ theme }) => {
  const [customers, setCustomers] = useState([]);
  const isDark = theme === "dark";

  const bg = isDark ? "#0F172A" : "#FFFFFF";
  const text = isDark ? "#F8FAFC" : "#0F172A";
  const card = isDark ? "#1E293B" : "#F8FAFC";
  const border = isDark ? "#334155" : "#E2E8F0";

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:6060/api/admin/customers");
      if (res.data.success) {
        setCustomers(res.data.customers);
      }
    } catch (err) {
      console.log("Fetch Customer Error:", err);
    }
  };

  // Block / Unblock user
  const toggleStatus = async (id) => {
    try {
      const res = await axios.put(`http://localhost:6060/api/admin/customers/toggle/${id}`);
      alert(res.data.message);
      fetchCustomers();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // Delete customer
  const deleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      await axios.delete(`http://localhost:6060/api/admin/customers/${id}`);
      alert("Customer deleted");
      setCustomers(customers.filter((u) => u._id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="p-6 rounded-xl shadow-xl" style={{ background: bg, color: text }}>
      <h1 className="text-3xl font-bold mb-6"><AvatarIcon /> Manage Customers</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ borderColor: border }}>
          <thead>
            <tr style={{ background: card }}>
              <th className="p-3 text-left">Customer Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((cust) => (
              <tr
                key={cust._id}
                className="border-b"
                style={{ borderColor: border }}
              >
                <td className="p-3 font-semibold">
                  {cust.firstName} {cust.lastName}
                </td>

                <td className="p-3">{cust.email}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      cust.isActive
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {cust.isActive ? "Active" : "Blocked"}
                  </span>
                </td>

                <td className="p-3 text-center">
                  {/* Toggle Status */}
                  <button
                    onClick={() => toggleStatus(cust._id)}
                    className="px-4 py-1 rounded-lg text-white font-semibold mr-3"
                    style={{
                      background: cust.isActive ? "#DC2626" : "#10B981",
                    }}
                  >
                    {cust.isActive ? "Block" : "Unblock"}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteCustomer(cust._id)}
                    className="px-4 py-1 rounded-lg bg-red-500 text-white font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {customers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-6 opacity-70">
                  No Customers Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCustomers;
