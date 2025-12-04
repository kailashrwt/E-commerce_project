import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FlashIcon } from "../../../components/Icons";

const SummerFling = ({ theme = "light" }) => {
    const isDark = theme === "dark";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSummerFling = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:6060/api/products/category/Summer Fling"
                );

                if (res.data.success) {
                    setProducts(res.data.products);
                }
            } catch (err) {
                console.error("Summer Fling Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSummerFling();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-[50vh] text-xl">
                Loading Summer Fling Collection...
            </div>
        );

    return (
        <div
            className="px-4 sm:px-6 md:px-10 py-6"
            style={{
                background: isDark ? "#0F172A" : "#F8FAFC",
                minHeight: "90vh",
                color: isDark ? "white" : "black",
                transition: "0.3s",
            }}
        >
            {/* HEADER */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
                🌴 Summer Fling Collection
            </h1>

            {/* NO PRODUCTS */}
            {products.length === 0 ? (
                <p className="text-center text-gray-500">
                    No items found in Summer Fling Collection.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {products.map((item) => (
                        <div
                            key={item._id}
                            className="shadow-lg rounded-xl p-4 hover:scale-[1.03] transition-all cursor-pointer"
                            style={{
                                background: isDark ? "#1E293B" : "#ffffff",
                                border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                            }}
                        >
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
                                    background:
                                        "linear-gradient(135deg, #FBBF24 0%, #FDE68A 100%)",
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

export default SummerFling;
