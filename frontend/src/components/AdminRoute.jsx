import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;

        console.log("AdminRoute check:", {token, user});

    // 🔒 Agar login hi nahi hai
    if (!token || !user) {
        console.warn("⛔ Access denied: Not logged in");
        return <Navigate to="/login" replace />;
    }

    // 🧑‍💻 Agar user admin nahi hai
    if (user.role !== "admin") {
        console.warn("🚫 Access denied: Not admin");
        return <Navigate to="/" replace />;
    }

    // ✅ Admin access allow
    return children;
};

export default AdminRoute;
