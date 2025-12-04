import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import axios from "axios";
import { ListOrdered, ShoppingBagIcon } from "lucide-react";

const Chart = ({ theme = "light" }) => {
  const [statusData, setStatusData] = useState([]);
  const [bestProductsData, setBestProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const isDark = theme === "dark";

  const bg = isDark ? "#0F172A" : "#ffffff";
  const card = isDark ? "#1E293B" : "#ffffff";
  const text = isDark ? "#F8FAFC" : "#0F172A";
  const grid = isDark ? "#334155" : "#E2E8F0";
  const border = isDark ? "#334155" : "#E2E8F0";

  useEffect(() => {
    loadReportData();
  }, []);

  const loadReportData = async () => {
    try {
      const res = await axios.get("http://localhost:6060/api/admin/reports");

      if (!res.data.success) return;

      const report = res.data.report;

      setStatusData(
        report.ordersByStatus.map((item) => ({
          name: item._id,
          orders: item.count,
        }))
      );

      setBestProductsData(
        report.bestSellingProducts.map((item) => ({
          name: item.productDetails?.[0]?.name || "Unknown",
          qty: item.qty,
        }))
      );
    } catch (err) {
      console.log("Chart Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-white">Loading charts...</div>;

  return (
    <div className="space-y-8">

      {/* ============ ORDERS BY STATUS ============== */}
      <div
        className="p-4 sm:p-6 rounded-2xl shadow-xl w-full"
        style={{ background: card, border: `1px solid ${border}` }}
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <ListOrdered size={22} color={text} />
          <h2
            className="text-lg sm:text-xl font-bold text-center"
            style={{ color: text }}
          >
            Orders By Status
          </h2>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} />
            <XAxis stroke={text} dataKey="name" />
            <YAxis stroke={text} />
            <Tooltip
              contentStyle={{
                background: card,
                border: `1px solid ${border}`,
                color: text,
              }}
            />
            <Legend wrapperStyle={{ color: text }} />
            <Bar dataKey="orders" fill="#3B82F6" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ============ BEST SELLING PRODUCTS ============== */}
      <div
        className="p-4 sm:p-6 rounded-2xl shadow-xl w-full"
        style={{ background: card, border: `1px solid ${border}` }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <ShoppingBagIcon size={22} color={text} />
          <h2
            className="text-lg sm:text-xl font-bold text-center"
            style={{ color: text }}
          >
            Best Selling Products
          </h2>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bestProductsData}>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} />
            <XAxis stroke={text} dataKey="name" />
            <YAxis stroke={text} />
            <Tooltip
              contentStyle={{
                background: card,
                border: `1px solid ${border}`,
                color: text,
              }}
            />
            <Legend wrapperStyle={{ color: text }} />
            <Bar dataKey="qty" fill="#F59E0B" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
