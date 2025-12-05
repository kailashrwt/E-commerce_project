import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { CartIcon, SimpleMagic } from "../components/Icons";

const Shop = ({ theme = "light", setCartCount }) => {
  const isDark = theme === "dark";
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const API = import.meta.env.VITE_API_URL;   // <--- 🔥 Base URL

  // Read query
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  // Load Products from LIVE backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await axios.get(`${API}/api/products`);
        if (res.data.success) setProducts(res.data.products);
      } catch (err) {
        console.log("Shop Load Error:", err);
      }
    };
    loadProducts();
  }, []);

  // Filter Logic
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery)
  );

  // ADD to cart
  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first!");

    try {
      const res = await axios.post(
        `${API}/api/cart/add`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        alert("Added to Cart!");
        setCartCount((prev) => prev + 1);
      }
    } catch (err) {
      console.log("Add to Cart Error:", err);
      alert("Failed to add item.");
    }
  };

  return (
    <div
      className="pt-28 px-6 md:px-12 transition-all"
      style={{
        background: isDark ? "#0F172A" : "#F8FAFC",
        color: isDark ? "#F8FAFC" : "#0F172A",
        minHeight: "100vh",
      }}
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-3">🛍️ Explore Our Collection</h1>
        <p className="opacity-70 font-medium">
          Handpicked jewelry crafted with love <SimpleMagic className="h-14 text-yellow-400"/>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {filteredProducts.length === 0 ? (
          <div className="col-span-4 text-center text-gray-500 py-20 text-xl font-semibold">
            ❌ No products found for: <span className="font-bold">"{searchQuery}"</span>
          </div>
        ) : (
          filteredProducts.map((item) => (
            <div key={item._id} className="rounded-xl p-4 shadow-lg hover:scale-105 transition">
              <div className="w-full h-56 overflow-hidden rounded-lg">
                <img
                  src={`${API}${item.image}`}      // <--- IMAGE URL FIXED 🔥
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition"
                />
              </div>

              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
                <p className="text-sm opacity-70">{item.category}</p>
                <p className="text-lg font-bold mt-2 text-green-500">₹ {item.price}</p>

                <button
                  onClick={() => handleAddToCart(item._id)}
                  className="mt-4 w-full py-2 rounded-lg font-semibold bg-teal-400 text-white"
                >
                  Add to Cart <CartIcon className="w-8 h-8"/>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;
