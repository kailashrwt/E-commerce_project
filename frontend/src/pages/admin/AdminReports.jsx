import React, { useEffect, useState } from "react";
import axios from "axios";
import { DashboardLayoutIcon } from "../../components/Icons";
import { ListOrdered, ShoppingBasket } from "lucide-react";

const AdminReports = ({ theme = "light" }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const isDark = theme === "dark";

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await axios.get("http://localhost:6060/api/admin/reports");
      if (res.data.success) {
        setReport(res.data.report);
      }
    } catch (err) {
      console.log("Report Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading Reports...</div>;

  if (!report)
    return (
      <div className="p-6 text-red-500 text-lg">
        No report data available.
      </div>
    );

  return (
    <div
      className="p-6 rounded-2xl shadow-xl"
      style={{
        background: isDark ? "#0f172a" : "#ffffff",
        color: isDark ? "#f8fafc" : "#0f172a",
        border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`
      }}
    >
      <h1 className="text-3xl font-bold mb-6"><DashboardLayoutIcon /> Admin Reports</h1>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <ReportCard title="Total Users" value={report.totalUsers} color="#3B82F6" />
        <ReportCard title="Total Orders" value={report.totalOrders} color="#10B981" />
        <ReportCard title="Total Sales" value={`₹${report.totalSales}`} color="#F59E0B" />
      </div>

      {/* ORDERS BY STATUS */}
      <div
        className="p-6 rounded-xl mb-8"
        style={{
          background: isDark ? "#1e293b" : "#f8fafc",
          border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`
        }}
      >
        <h2 className="text-2xl font-semibold mb-4"><ListOrdered /> Orders By Status</h2>

        {report.ordersByStatus?.length > 0 ? (
          <ul className="space-y-2">
            {report.ordersByStatus.map((st) => (
              <li
                key={st._id}
                className="p-3 rounded-lg flex justify-between"
                style={{
                  background: isDark ? "#0f172a" : "#ffffff",
                  border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`
                }}
              >
                <span className="font-medium">{st._id}</span>
                <span className="font-bold">{st.count}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No order status data found.</p>
        )}
      </div>

      {/* BEST SELLING PRODUCTS */}
      <div
        className="p-6 rounded-xl"
        style={{
          background: isDark ? "#1e293b" : "#f8fafc",
          border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`
        }}
      >
        <h2 className="text-2xl font-semibold mb-4"><ShoppingBasket /> Best Selling Products</h2>

        {report.bestSellingProducts?.length > 0 ? (
          <ul className="space-y-2">
            {report.bestSellingProducts.map((item) => (
              <li
                key={item._id}
                className="p-3 rounded-lg flex justify-between"
                style={{
                  background: isDark ? "#0f172a" : "#ffffff",
                  border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`
                }}
              >
                <span>
                  {item.productDetails?.[0]?.name || "Unknown Product"}
                </span>
                <span className="font-bold">Qty: {item.qty}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No product sales data available.</p>
        )}
      </div>
    </div>
  );
};

const ReportCard = ({ title, value, color }) => (
  <div
    className="p-6 rounded-xl shadow text-center"
    style={{
      background: "#ffffff10",
      border: "1px solid rgba(255,255,255,0.15)"
    }}
  >
    <h3 className="text-lg font-semibold opacity-80">{title}</h3>
    <p
      className="text-3xl font-bold mt-2"
      style={{ color }}
    >
      {value}
    </p>
  </div>
);

export default AdminReports;
