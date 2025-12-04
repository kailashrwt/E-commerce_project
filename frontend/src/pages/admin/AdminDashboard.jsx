import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "../../components/Chart";
import {Menu, Settings} from "lucide-react"

const AdminDashboard = ({ theme }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const isDark = theme === "dark";

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("http://localhost:6060/api/admin/reports");
      if (res.data.success) setReport(res.data.report);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"> Loading Dashboard...</div>;
  if (!report) return <div className="text-red-500 p-6">❌ No dashboard data found.</div>;

  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: "#D4AF37" }}><Settings /> Admin Dashboard</h1>

      {/* Chart area */}
      <div className="w-full mb-6">
        <div className="rounded-xl p-4 shadow-md" style={{ background: isDark ? "#0f172a" : "#fff", border: `1px solid ${isDark ? "#1f2937" : "#e6e9ee"}` }}>
          <Chart theme={theme} />
        </div>
      </div>

      {/* Stats grid responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Products" value={report.totalProducts} />
        <StatCard title="Total Orders" value={report.totalOrders} />
        <StatCard title="Total Users" value={report.totalUsers} />
        <StatCard title="Total Revenue" value={`₹${report.totalSales}`} />
      </div>

      {/* Responsive tables/cards for details */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">

        <div className="rounded-xl p-4 shadow-md" style={{ background: isDark ? "#0b1220" : "#fff", border: `1px solid ${isDark ? "#1f2937" : "#e6e9ee"}` }}>
          <h3 className="font-semibold mb-3">Top Products</h3>
          {report.bestSellingProducts?.length ? (
            <div className="space-y-3 max-h-56 overflow-auto">
              {report.bestSellingProducts.slice(0, 6).map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0">
                    <img src={`http://localhost:6060${p.productDetails?.[0]?.image || "/placeholder.png"}`} alt={p.productDetails?.[0]?.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{p.productDetails?.[0]?.name || "Unknown"}</div>
                    <div className="text-sm opacity-75">{p.qty} sold</div>
                  </div>
                </div>
              ))}
            </div>
          ) : <div className="opacity-70">No data</div>}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="p-4 rounded-xl shadow-sm hover:shadow-lg transition flex flex-col">
    <div className="text-sm text-gray-500 mb-2">{title}</div>
    <div className="text-2xl font-bold text-[#D4AF37]">{value}</div>
  </div>
);

export default AdminDashboard;
