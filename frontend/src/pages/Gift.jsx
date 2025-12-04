import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GiftIcon } from "lucide-react";
import {
    Gift2100To3500Icon,
    Gift3600To5000Icon,
    GiftUnder2000Icon,
} from "../components/Icons";

const Gifts = ({ theme = "light" }) => {
    const isDark = theme === "dark";
    const navigate = useNavigate();
    const [giftProducts, setGiftProducts] = useState({});
    const [loading, setLoading] = useState(true);

    const giftCategories = [
        {
            label: "Gift under ₹2000",
            min: 0,
            max: 2000,
            path: "/gifts/giftunder2000",
            icon: <GiftUnder2000Icon className="w-7 h-7 sm:w-8 sm:h-8" />,
        },
        {
            label: "Gift ₹2100-₹3500",
            min: 2100,
            max: 3500,
            path: "/gifts/gift2100to3500",
            icon: <Gift2100To3500Icon className="w-7 h-7 sm:w-8 sm:h-8" />,
        },
        {
            label: "Gift ₹3600 – ₹5000",
            min: 3600,
            max: 5000,
            path: "/gifts/gift3600to5000",
            icon: <Gift3600To5000Icon className="w-7 h-7 sm:w-8 sm:h-8" />,
        },
    ];

    useEffect(() => {
        const fetchGiftRanges = async () => {
            try {
                const results = {};

                for (const range of giftCategories) {
                    const res = await axios.get(
                        `http://localhost:6060/api/products/price/${range.min}/${range.max}`
                    );

                    if (res.data.success) {
                        results[range.label] = res.data.products.slice(0, 4);
                    }
                }

                setGiftProducts(results);
            } catch (err) {
                console.error("Gift fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchGiftRanges();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-[50vh] text-xl">
                Loading Gift Collections...
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
            {/* MAIN HEADING */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-10 text-center flex items-center justify-center gap-2">
                <GiftIcon className="w-7 h-7 sm:w-8 sm:h-8" /> Gift Collections
            </h1>

            {giftCategories.map((range) => (
                <div key={range.label} className="mb-16">
                    {/* CATEGORY HEADING */}
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                        {range.icon} {range.label}
                    </h2>

                    {/* EMPTY TEXT */}
                    {(!giftProducts[range.label] ||
                        giftProducts[range.label].length === 0) && (
                            <p className="text-gray-500 mb-6">
                                No products found in this price range.
                            </p>
                        )}

                    {/* PRODUCTS GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                        {(giftProducts[range.label] || []).map((item) => (
                            <div
                                key={item._id}
                                onClick={() => navigate(`/product/${item._id}`)}
                                className="shadow-lg rounded-xl p-4 hover:scale-[1.03] transition-all cursor-pointer"
                                style={{
                                    background: isDark ? "#1E293B" : "#ffffff",
                                    border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                                }}
                            >
                                <img
                                    src={`http://localhost:6060${item.image}`}
                                    alt={item.name}
                                    className="w-full h-44 sm:h-48 md:h-52 object-cover rounded-lg mb-3"
                                />

                                <h3 className="font-semibold text-base sm:text-lg">
                                    {item.name}
                                </h3>
                                <p className="text-green-500 font-bold">₹{item.price}</p>
                            </div>
                        ))}
                    </div>

                    {/* VIEW ALL BUTTON */}
                    <div className="text-center mt-5">
                        <button
                            onClick={() => navigate(range.path)}
                            className="px-6 py-2 rounded-lg text-white font-semibold text-sm sm:text-base"
                            style={{
                                background:
                                    "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                            }}
                        >
                            View All →
                        </button>
                    </div>

                    <hr className="my-10 border-gray-300" />
                </div>
            ))}
        </div>
    );
};

export default Gifts;
