import React, { useEffect, useState } from "react";
import axios from "axios";
import { DashboardLayoutIcon } from "../../components/Icons";
import { LogOutIcon } from "lucide-react";

const AdminProfile = ({ theme = "light", currentUser, onLogout }) => {
  const isDark = theme === "dark";
  const bg = isDark ? "#0F172A" : "#F8FAFC";
  const card = isDark ? "#1E293B" : "#FFFFFF";
  const border = isDark ? "#334155" : "#E2E8F0";
  const text = isDark ? "#F8FAFC" : "#0F172A";

  const [orderStats, setOrderStats] = useState({
    total: 0,
    delivered: 0,
    pending: 0,
    shipped: 0,
    cancelled: 0
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:6060/api/admin/order");
        if (res.data.success) {
          const orders = res.data.orders;

          const stats = {
            total: orders.length,
            delivered: orders.filter(o => o.status === "Delivered").length,
            pending: orders.filter(o => o.status === "Pending").length,
            shipped: orders.filter(o => o.status === "Shipped").length,
            cancelled: orders.filter(o => o.status === "Cancelled").length
          };

          setOrderStats(stats);
        }
      } catch (err) {
        console.log("Order Fetch Error:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div
      className="min-h-screen w-full flex justify-center items-start px-4 sm:px-6 md:px-10 py-6"
      style={{ background: bg }}
    >
      <div
        className="w-full max-w-3xl mx-auto rounded-2xl shadow-lg p-6 sm:p-8"
        style={{ background: card, border: `1px solid ${border}` }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: text }}>
            <DashboardLayoutIcon /> Admin Profile
          </h1>

          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-all w-full sm:w-auto"
          >
            Logout
            <LogOutIcon />
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg">
            {currentUser?.firstName?.[0]?.toUpperCase() ||
              currentUser?.name?.[0]?.toUpperCase()}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-4" style={{ color: text }}>
            {currentUser?.firstName || currentUser?.name || "Admin User"}
          </h2>

          <p className="text-sm opacity-70" style={{ color: text }}>
            {currentUser?.email}
          </p>

          <span className="mt-2 px-4 py-1 text-xs sm:text-sm rounded-full bg-blue-600 text-white font-semibold">
            {currentUser?.role?.toUpperCase() || "ADMIN"}
          </span>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Total Orders"
            value={orderStats.total}
            color="text-blue-500"
            card={card}
            border={border}
            text={text}
          />

          <StatCard
            label="Delivered"
            value={orderStats.delivered}
            color="text-green-500"
            card={card}
            border={border}
            text={text}
          />

          <StatCard
            label="Pending"
            value={orderStats.pending}
            color="text-yellow-500"
            card={card}
            border={border}
            text={text}
          />
        </div>

        {/* Information Section */}
        <div
          className="p-6 rounded-xl"
          style={{ background: card, border: `1px solid ${border}` }}
        >
          <h2 className="text-lg sm:text-xl font-bold mb-4" style={{ color: text }}>
            Personal Information
          </h2>

          <div className="space-y-4 text-sm sm:text-base">
            <InfoRow
              label="Full Name"
              value={currentUser?.firstName || "Admin"}
              color={text}
            />
            <InfoRow
              label="Email"
              value={currentUser?.email}
              color={text}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function StatCard({ label, value, color, card, border, text }) {
  return (
    <div
      className="p-4 rounded-xl shadow text-center cursor-pointer hover:opacity-80 transition-all"
      style={{ background: card, border: `1px solid ${border}` }}
    >
      <h3 className={`text-xl font-bold ${color}`}>{value}</h3>
      <p style={{ color: text }}>{label}</p>
    </div>
  );
}

function InfoRow({ label, value, color }) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-semibold" style={{ color }}>
        {label}
      </span>
      <span className="opacity-80" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

export default AdminProfile;
