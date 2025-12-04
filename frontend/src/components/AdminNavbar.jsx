import React from "react";

export default function AdminNavbar({ onMenuClick = () => {} }) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 h-16"
      style={{
        background: "rgba(15,23,42,0.95)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* LEFT SECTION */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-md hover:bg-gray-800 text-white"
        >
          ☰
        </button>

        {/* Brand Name (Hidden on Mobile) */}
        <div
          className="hidden md:flex items-center gap-3 text-lg font-bold"
          style={{ color: "#D4AF37" }}
        >
            Lara Admin
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">
        {/* Avatar - Direct Profile */}
        <button
          onClick={() => (window.location.href = "/admin-profile")}
          className="
            w-10 h-10 rounded-full 
            bg-gradient-to-tr from-blue-500 to-purple-500 
            flex items-center justify-center 
            text-white text-lg font-bold 
            hover:scale-105 transition-transform
          "
        >
          A
        </button>
      </div>
    </nav>
  );
}
