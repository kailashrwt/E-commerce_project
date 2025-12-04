import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Plus, Edit2, Trash2, ShoppingBagIcon } from "lucide-react";

const ManageProducts = ({ theme = "light" }) => {
  const isDark = theme === "dark";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:6060/api/products");
        if (res.data.success) setProducts(res.data.products);
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await axios.delete(`http://localhost:6060/api/products/${id}`);
      if (res.data.success) {
        alert("Product deleted!");
        setProducts(products.filter((i) => i._id !== id));
      }
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  const bg = isDark ? "#0F172A" : "#FFFFFF";
  const card = isDark ? "#1E293B" : "#FFFFFF";
  const text = isDark ? "#F8FAFC" : "#0F172A";
  const border = isDark ? "#334155" : "#E2E8F0";

  return (
    <div
      className="p-4 sm:p-6 rounded-xl shadow-xl min-h-screen"
      style={{
        background: bg,
        color: text,
        border: `1px solid ${border}`,
      }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold"><ShoppingBagIcon /> Manage Products</h1>

        <Link
          to="/admin/add-product"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold"
          style={{
            background: "linear-gradient(135deg,#4ECDC4 0%,#2DD4BF 100%)",
            boxShadow: "0 4px 12px rgba(78,205,196,0.35)",
          }}
        >
          <Plus size={18} /> Add Product
        </Link>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr
              style={{
                background: isDark ? "#1e293b" : "#f1f5f9",
                color: text,
              }}
            >
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr
                key={item._id}
                className="border-b"
                style={{ borderColor: border }}
              >
                <td className="p-3">
                  <img
                    src={`http://localhost:6060${item.image}`}
                    className="w-14 h-14 rounded-lg object-cover shadow-sm"
                  />
                </td>

                <td className="p-3 font-semibold">{item.name}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3 font-semibold text-green-500">₹{item.price}</td>
                <td className="p-3">{item.stock}</td>

                <td className="p-3 text-center">
                  <div className="flex justify-center gap-4">
                    <Link
                      to={`/admin-edit-product/${item._id}`}
                      className="p-2 rounded-lg"
                      style={{ background: isDark ? "#334155" : "#e2e8f0" }}
                    >
                      <Edit2 size={18} className={isDark ? "text-white" : "text-black"} />
                    </Link>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 rounded-lg"
                      style={{ background: "rgba(255,0,0,0.1)" }}
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden grid gap-4 mt-4">
        {products.map((item) => (
          <div
            key={item._id}
            className="p-4 rounded-xl shadow border"
            style={{ background: card, borderColor: border }}
          >
            <div className="flex gap-4">
              <img
                src={`http://localhost:6060${item.image}`}
                className="w-20 h-20 rounded-lg object-cover shadow-sm"
              />

              <div className="flex-1">
                <h2 className="font-bold text-lg">{item.name}</h2>
                <p className="text-sm opacity-70">{item.category}</p>
                <p className="text-green-500 font-bold mt-1">₹{item.price}</p>
                <p className="text-sm opacity-70">Stock: {item.stock}</p>
              </div>
            </div>

            <div className="flex justify-between gap-3 mt-4">
              <Link
                to={`/admin-edit-product/${item._id}`}
                className="flex items-center justify-center flex-1 py-2 rounded-lg"
                style={{ background: isDark ? "#334155" : "#e2e8f0" }}
              >
                <Edit2 size={18} className={isDark ? "text-white" : "text-black"} />
              </Link>

              <button
                onClick={() => handleDelete(item._id)}
                className="flex items-center justify-center flex-1 py-2 rounded-lg"
                style={{ background: "rgba(255,0,0,0.15)" }}
              >
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="text-center p-6 opacity-80">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
