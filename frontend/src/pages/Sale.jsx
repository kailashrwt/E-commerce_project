import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FlashIcon } from "../components/Icons";

const Sale = ({ theme = "light" }) => {
    const isDark = theme === "dark";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSaleProducts = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:6060/api/products/price/0/2000"
                );

                if (res.data.success) {
                    setProducts(res.data.products);
                }
            } catch (err) {
                console.error("Sale Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSaleProducts();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-[50vh] text-xl">
                Loading Sale Products...
            </div>
        );

    return (
        <div
            className="px-4 sm:px-6 md:px-10 py-6"
            style={{
                background: isDark ? "#0F172A" : "#F8FAFC",
                minHeight: "90vh",
                color: isDark ? "white" : "black",
            }}
        >
            {/* HEADING */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
                🔥 Summer Sale
            </h1>
            <p className="text-center opacity-80 mb-10 text-sm sm:text-base">
                Grab the hottest deals before they're gone!
            </p>

            {/* EMPTY CHECK */}
            {products.length === 0 ? (
                <p className="text-center text-gray-500">
                    No sale products available right now.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {products.map((item) => (
                        <div
                            key={item._id}
                            className="shadow-lg rounded-xl p-4 hover:scale-[1.03] transition-all relative cursor-pointer"
                            style={{
                                background: isDark ? "#1E293B" : "#ffffff",
                                border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                            }}
                        >
                            {/* SALE BADGE */}
                            <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold shadow-md">
                                Sale 🔥
                            </span>

                            {/* IMAGE */}
                            <img
                                src={`http://localhost:6060${item.image}`}
                                alt={item.name}
                                className="w-full h-48 sm:h-56 md:h-60 object-cover rounded-lg mb-4"
                            />

                            {/* NAME */}
                            <h2 className="text-lg sm:text-xl font-bold">{item.name}</h2>
                            <p className="text-sm opacity-80">{item.category}</p>

                            {/* PRICE */}
                            <p className="text-xl font-semibold text-green-500 mt-2">
                                ₹{item.price}
                            </p>

                            {/* VIEW DETAILS */}
                            <button
                                onClick={() => navigate(`/product/${item._id}`)}
                                className="mt-4 w-full py-2 rounded-lg text-white font-semibold text-sm sm:text-base"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                                }}
                            >
                                View Details
                            </button>

                            {/* BUY NOW */}
                            <button
                                onClick={() => navigate(`/payment?productId=${item._id}`)}
                                className="mt-2 w-full py-2 rounded-lg text-white font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
                                style={{
                                    background: "linear-gradient(135deg, #F43F5E, #FB7185)",
                                }}
                            >
                                <FlashIcon className="w-5 h-5 sm:w-6 sm:h-6" /> Buy Now
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Sale;
