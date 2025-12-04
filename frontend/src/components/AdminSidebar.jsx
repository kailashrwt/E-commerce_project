import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AvatarIcon, DashboardLayoutIcon, PremiumDiamondLogo, ShopIcon } from "./Icons";
import {ChartArea, ListOrdered, Menu, ShoppingBag} from "lucide-react"

export default function AdminSidebar({
  theme = "light",
  open = false,
  onClose = () => {},
}) {
  const location = useLocation();

  const menuItems = [
    { path: "/admin-dashboard", label: "Dashboard", icon: <DashboardLayoutIcon /> },
    { path: "/admin/manage-products", label: "Products", icon: <ShoppingBag /> },
    { path: "/admin/orders", label: "Orders", icon: <ListOrdered /> },
    { path: "/admin/customers", label: "Customers", icon: <AvatarIcon /> },
    { path: "/admin/reports", label: "Reports", icon: <ChartArea /> },
  ];

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 md:w-60 
          bg-[#0F172A] text-gray-100 border-r border-gray-800 shadow-xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between h-20 px-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="text-2xl"><PremiumDiamondLogo  className="w-8 h-8"/></div>
            <div className="font-bold tracking-wide text-lg" style={{ color: "#D4AF37" }}>
              Lara Admin
            </div>
          </div>

          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-md hover:bg-gray-700"
          >
            ✖
          </button>
        </div>

        {/* MENU */}
        <nav className="px-3 py-4 space-y-1 overflow-y-auto h-[calc(100%-80px)]">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white shadow-md"
                      : "hover:bg-gray-800"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
