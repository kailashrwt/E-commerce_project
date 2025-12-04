import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BerryMinimum, CitrusChic, ClassicVanilla, LuxuriusLime, PremiumDiamondLogo, SorbetSensation, SummerFling } from "../components/Icons";
import { Diamond } from "lucide-react";

const Flavors = ({ theme = "light" }) => {
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [flavorProducts, setFlavorProducts] = useState({});
  const [loading, setLoading] = useState(true);

  const flavorList = [
    { label: "Citrus Chic", path: "/client/flavors/citruschic", icon: <CitrusChic /> },
    { label: "Berry Minimum", path: "/client/flavors/berryminimum", icon: <BerryMinimum /> },
    { label: "Classic Vanilla", path: "/client/flavors/classicvanilla", icon: <ClassicVanilla /> },
    { label: "Luxurious Lime", path: "/client/flavors/luxuriouslime", icon: <LuxuriusLime /> },
    { label: "Sorbet Sensation", path: "/client/flavors/sorbetsensation", icon: <SorbetSensation /> },
    { label: "Summer Fling ", path: "/client/flavors/summerfling", icon: <SummerFling /> }
  ];

  useEffect(() => {
    const loadAllCategories = async () => {
      try {
        const results = {};

        // Fetch each flavor category
        for (const flavor of flavorList) {
          const res = await axios.get(
            `http://localhost:6060/api/products/category/${flavor.label}`
          );

          if (res.data.success) {
            results[flavor.label] = res.data.products.slice(0, 4); // show only first 4
          }
        }

        setFlavorProducts(results);
      } catch (error) {
        console.error("Flavors fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAllCategories();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h2 className="text-xl">Loading Flavors...</h2>
      </div>
    );

  return (
    <div
      className="p-6"
      style={{
        background: isDark ? "#0F172A" : "#F8FAFC",
        minHeight: "80vh",
        color: isDark ? "white" : "black",
      }}
    >
      <h1 className="text-3xl font-bold mb-10 text-center">< Diamond /> Flavors Collection</h1>

      {flavorList.map((flavor) => (
        <div key={flavor.label} className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            {flavor.icon} {flavor.label}
          </h2>

          {/* If no products */}
          {(!flavorProducts[flavor.label] || flavorProducts[flavor.label].length === 0) && (
            <p className="text-gray-500 mb-6">No products found for this flavor.</p>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {(flavorProducts[flavor.label] || []).map((item) => (
              <div
                key={item._id}
                className="shadow-lg rounded-xl p-4 hover:scale-105 transition-all cursor-pointer"
                style={{
                  background: isDark ? "#1E293B" : "#ffffff",
                  border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                }}
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <img
                  src={`http://localhost:6060${item.image}`}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-green-500 font-bold">₹{item.price}</p>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate(flavor.path)}
              className="px-6 py-2 rounded-lg text-white font-semibold"
              style={{
                background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
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

export default Flavors;
