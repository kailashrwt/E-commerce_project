import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartIcon, FlashIcon } from "../components/Icons";

const CartPage = ({ setCartCount }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.get("http://localhost:6060/api/cart/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data.items || []);
      setCartCount(res.data.totalItems || 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (productId, qty) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:6060/api/cart/update",
        { productId, quantity: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems(res.data.items);
      setCartCount(res.data.totalItems);
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:6060/api/cart/item/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems(res.data.items);
      setCartCount(res.data.totalItems);
    } catch (err) {
      console.log(err);
    }
  };

  const totalPrice = items.reduce((s, it) => s + it.price * it.quantity, 0);

  if (loading)
    return (
      <div className="p-6 text-center text-white bg-black min-h-screen">
        Loading cart...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-black min-h-screen text-white">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        <CartIcon /> Your Cart
      </h2>

      {items.length === 0 ? (
        <div className="text-center text-gray-400 p-6 text-lg">
          Your cart is empty.
        </div>
      ) : (
        <>
          {/* CART ITEMS */}
          <div className="space-y-4">
            {items.map((it) => (
              <div
                key={it.productId}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-xl shadow-lg border border-gray-600 bg-[#1E293B] transition"
              >
                {/* IMAGE */}
                <img
                  src={`http://localhost:6060${it.image}`}
                  alt={it.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover"
                />

                {/* INFO */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="font-semibold text-lg">{it.name}</div>
                  <div className="text-gray-300">₹{it.price}</div>
                </div>

                {/* QTY */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(it.productId, it.quantity - 1)}
                    disabled={it.quantity <= 1}
                    className="bg-black text-white px-3 py-1 rounded disabled:opacity-40 border border-gray-600"
                  >
                    -
                  </button>

                  <div className="font-medium text-white">{it.quantity}</div>

                  <button
                    onClick={() => updateQty(it.productId, it.quantity + 1)}
                    className="bg-black text-white px-3 py-1 rounded border border-gray-600"
                  >
                    +
                  </button>
                </div>

                {/* PRICE */}
                <div className="text-right font-semibold text-green-400 min-w-[80px]">
                  ₹{it.price * it.quantity}
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeItem(it.productId)}
                  className="text-red-400 font-medium hover:text-red-500"
                >
                  Remove
                </button>

                {/* BUY NOW */}
                <button
                  onClick={() => navigate(`/payment?productId=${it.productId}`)}
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700 transition flex items-center gap-1"
                >
                  <FlashIcon className="w-5 h-5" /> Buy Now
                </button>
              </div>
            ))}
          </div>

          {/* TOTAL SECTION */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-white">
            <div className="text-xl font-semibold">
              Total: <span className="text-green-400">₹{totalPrice}</span>
            </div>

            <button
              onClick={() => navigate("/my-orders")}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              My Orders
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
