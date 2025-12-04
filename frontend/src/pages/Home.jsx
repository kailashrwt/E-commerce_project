import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BerryMinimum, BraceletsIcon, CitrusChic, ClassicVanilla, EarringsIcon, Gift2100To3500Icon, Gift3600To5000Icon, HoopsIcon, LilScoopsies, LoginIcon, LuxuriusLime, NecklaceIcon, RingsIcon, SassySorbet, ShopIcon, SorbetSensation, SummerFling } from "../components/Icons";
import { DiamondMinus, GiftIcon, SearchCheckIcon, SearchCodeIcon, SearchIcon, ShoppingBag } from "lucide-react";
import Bracelets from "./client/shop/Bracelets";
import LuxuriousLime from "./client/flavors/LuxuriousLime";

export default function Home({ theme }) {
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const categories = [
    { label: "Hoops", path: "/client/shop/hoops", type: "Hoops", icon: <HoopsIcon /> },
    { label: "Earrings", path: "/client/shop/earrings", type: "Earrings", icon: <EarringsIcon /> },
    { label: "Necklace", path: "/client/shop/necklace", type: "Necklace", icon: <NecklaceIcon /> },
    { label: "Bracelets", path: "/client/shop/bracelets", type: "Bracelets", icon: <BraceletsIcon /> },
    { label: "Rings", path: "/client/shop/rings", type: "Rings", icon: <RingsIcon /> },

    // Flavors
    { label: "Citrus Chic", path: "/flavors/citruschic", type: "Citrus Chic", icon: <CitrusChic /> },
    { label: "Berry Minimum", path: "/flavors/berryminimum", type: "Berry Minimum", icon: <BerryMinimum /> },
    { label: "Classic Vanilla", path: "/flavors/classicvanilla", type: "Classic Vanilla", icon: <ClassicVanilla /> },
    { label: "Luxurious Lime", path: "/flavors/luxuriouslime", type: "Luxurious Lime", icon: <LuxuriusLime /> },
    { label: "Sorbet Sensation", path: "/flavors/sorbetsensation", type: "Sorbet Sensation", icon: <SorbetSensation /> },
    { label: "Summer Fling", path: "/flavors/summerfling", type: "Summer Fling", icon: <SummerFling /> },

    // Sorbet Girl
    { label: "Lil Scoopsies", path: "/sorbet-girl/lilscoopsies", type: "Lil Scoopsies", icon: <LilScoopsies />},
    { label: "Sassy Sorbet", path: "/sorbet-girl/sassysorbet", type: "Sassy Sorbet", icon: <SassySorbet /> },

    // Gifts (price based)
    { label: "Gift Under ₹2000", path: "/gifts/giftunder2000", type: "under2000", icon: <GiftIcon /> },
    { label: "Gift ₹2100-₹3500", path: "/gifts/gift2100to3500", type: "2100to3500", icon: <Gift2100To3500Icon />},
    { label: "Gift ₹3600-₹5000", path: "/gifts/gift3600to5000", type: "3600to5000", icon: <Gift3600To5000Icon /> }
  ];

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const newData = {};

        for (const c of categories) {
          let url = "";

          if (c.type === "under2000") {
            url = "http://localhost:6060/api/products/price/0/2000";
          } else if (c.type === "2100to3500") {
            url = "http://localhost:6060/api/products/price/2100/3500";
          } else if (c.type === "3600to5000") {
            url = "http://localhost:6060/api/products/price/3600/5000";
          } else {
            url = `http://localhost:6060/api/products/category/${c.type}`;
          }

          const res = await axios.get(url);

          if (res.data.success) {
            newData[c.label] = res.data.products.slice(0, 4);
          }
        }

        setCategoryProducts(newData);
      } catch (error) {
        console.error("Home categories fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        background: isDark ? "#0F172A" : "#F8FAFC",
      }}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem", animation: "pulse 2s infinite" }}>💎</div>
          <h2 style={{ fontSize: "1.5rem", color: isDark ? "#F8FAFC" : "#0F172A", opacity: 0.8 }}>
            Loading Beautiful Jewelry...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: isDark ? "#0F172A" : "#F8FAFC",
        color: isDark ? "#F8FAFC" : "#0F172A",
        fontFamily: "'Inter', sans-serif"
      }}
    >

      {/* Hero Section */}
      <section
        style={{
          width: "100%",
          padding: "5rem 1.5rem",
          textAlign: "center",
          background: isDark
            ? "linear-gradient(135deg, #1E293B 0%, #0F172A 50%, #1E1B4B 100%)"
            : "linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 50%, #E0E7FF 100%)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Floating Emotes */}
        <div style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          fontSize: "4rem",
          opacity: 0.1,
          animation: "float 6s infinite"
        }}><DiamondMinus /></div>

        <div style={{
          position: "absolute",
          bottom: "15%",
          right: "8%",
          fontSize: "3rem",
          opacity: 0.1,
          animation: "float 5s infinite"
        }}>✨</div>

        <div style={{
          maxWidth: "850px",
          margin: "0 auto",
        }}>
          <h1 style={{
            fontSize: "3rem",
            fontWeight: "800",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Discover Your Signature Style ✨
          </h1>

          <p style={{
            fontSize: "1.2rem",
            opacity: 0.9,
            marginBottom: "2rem",
            lineHeight: "1.6",
            maxWidth: "600px",
            margin: "0 auto 2rem"
          }}>
            Handcrafted jewelry that tells your story, with elegance and soul.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/shop"
              style={{
                padding: "1rem 2rem",
                borderRadius: "50px",
                color: "#fff",
                fontWeight: "600",
                textDecoration: "none",
                background: "linear-gradient(135deg, #4ECDC4, #2DD4BF)",
                boxShadow: "0 8px 25px rgba(46, 212, 191, 0.3)",
              }}
            >
              <ShoppingBag /> Explore Collection
            </Link>

            <button
              onClick={() =>
                window.scrollTo({ top: 600, behavior: "smooth" })
              }
              style={{
                padding: "1rem 2rem",
                borderRadius: "50px",
                fontWeight: "600",
                background: "transparent",
                border: `2px solid ${isDark ? "#4ECDC4" : "#2DD4BF"}`,
                color: isDark ? "#F8FAFC" : "#0F172A",
              }}
            >
              <SearchIcon /> Browse Categories
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      {categories.map((cat, index) => (
        <div
          key={cat.label}
          style={{
            padding: "3.5rem 1.5rem",
            background:
              index % 2 === 0
                ? isDark
                  ? "linear-gradient(135deg,#0F172A,#1E293B)"
                  : "linear-gradient(135deg,#FFFFFF,#F8FAFC)"
                : "transparent",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "2rem",
                paddingLeft: "1rem",
                borderLeft: `4px solid ${isDark ? "#4ECDC4" : "#2DD4BF"}`,
              }}
            >
              <span style={{ fontSize: "2rem" }}>{cat.icon}</span>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                }}
              >
                {cat.label}
              </h2>
            </div>

            {/* Products */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "2rem",
              }}
            >
              {(categoryProducts[cat.label] || []).map((item) => (
                <div
                  key={item._id}
                  style={{
                    borderRadius: "18px",
                    padding: "1.2rem",
                    background: isDark
                      ? "linear-gradient(145deg,#1E293B,#334155)"
                      : "linear-gradient(145deg,#FFFFFF,#F8FAFC)",
                    border: isDark ? "1px solid #334155" : "1px solid #E2E8F0",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  <img
                    src={`http://localhost:6060${item.image}`}
                    alt=""
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginBottom: "0.7rem",
                    }}
                  />

                  <h3 style={{ fontWeight: "600", marginBottom: "0.3rem" }}>
                    {item.name}
                  </h3>
                  <p
                    style={{
                      fontWeight: "700",
                      color: "#10B981",
                      fontSize: "1.1rem",
                    }}
                  >
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>

            {/* View All */}
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <button
                onClick={() => navigate(cat.path)}
                style={{
                  padding: "1rem 2rem",
                  borderRadius: "50px",
                  fontWeight: "600",
                  border: "none",
                  color: "#fff",
                  background: "linear-gradient(135deg,#4ECDC4,#2DD4BF)",
                }}
              >
                Explore {cat.label} →
              </button>
            </div>
          </div>
        </div>
      ))}

      <style>
        {`
        @media (max-width: 900px) {
          h1 { font-size: 2.4rem !important; }
          h2 { font-size: 1.6rem !important; }
          p { font-size: 1rem !important; }
        }

        @media (max-width: 600px) {
          h1 { font-size: 2rem !important; }
          h2 { font-size: 1.3rem !important; }
        }

        @keyframes float {
          0%,100%{ transform: translateY(0); }
          50%{ transform: translateY(-18px); }
        }

        @keyframes pulse {
          0%,100%{ opacity: 1; }
          50%{ opacity: 0.5; }
        }
      `}
      </style>
    </div>
  );
}
