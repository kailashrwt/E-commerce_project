import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({ children, theme, onThemeToggle, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDark = theme === "dark";

  // close sidebar on larger screens (keeps consistent)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ensure at least open on md
  const contentPaddingLeft = window.innerWidth >= 768 ? "md:pl-64" : "";

  return (
    <div className={`${isDark ? "bg-[#0F172A] text-gray-100" : "bg-gray-50 text-gray-900"} min-h-screen`}>
      {/* Navbar */}
      <AdminNavbar theme={theme} onThemeToggle={onThemeToggle} onLogout={onLogout} onMenuClick={() => setSidebarOpen(s => !s)} />

      {/* Sidebar */}
      <AdminSidebar theme={theme} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className={`transition-all duration-300 ${contentPaddingLeft} pt-20`}>
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
