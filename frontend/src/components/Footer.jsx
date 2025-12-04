import { Heart, MagnetIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PremiumDiamondLogo, SimpleMagic } from "./Icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [openAccordion, setOpenAccordion] = useState(null); // mobile accordion state

  const footerMenu = {
    Shop: [
      { label: "Hoops", path: "/client/shop/hoops" },
      { label: "Earrings", path: "/client/shop/earrings" },
      { label: "Necklace", path: "/client/shop/necklace" },
      { label: "Bracelets", path: "/client/shop/bracelets" },
      { label: "Rings", path: "/client/shop/rings" },
    ],
    Flavours: [
      { label: "Citrus Chic", path: "/client/flavors/citruschic" },
      { label: "Berry Minimum", path: "/client/flavors/berryminimum" },
      { label: "Classic Vanilla", path: "/client/flavors/classicvanilla" },
      { label: "Luxurious Lime", path: "/client/flavors/luxuriouslime" },
      { label: "Sorbet Sensation", path: "/client/flavors/sorbetsensation" },
      { label: "Summer Fling Collection", path: "/client/flavors/summerfling" },
    ],
    "Sorbet Girl": [
      { label: "Lil Scoopsies", path: "/sorbetgirl/lilscoopsies" },
      { label: "Sassy Sorbet", path: "/sorbetgirl/sassysorbet" },
    ],
    Gifts: [
      { label: "Gift under-₹2000", path: "/gifts/giftunder2000" },
      { label: "Gift ₹2100-₹3500", path: "/gifts/gift2100to3500" },
      { label: "Gift ₹3600-₹5000", path: "/gifts/gift3600to5000" },
    ],
  };

  const toggleAccordion = (title) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        paddingTop: "4rem",
        marginTop: "4rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Logo Section */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              background:
                "linear-gradient(135deg,#FF6B6B,#A78BFA,#4ECDC4,#FBBF24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <SimpleMagic className="w-8 h-8 text-yellow-400"/> Lara
          </h1>
          <p style={{ color: "#64748B", maxWidth: "500px", margin: "0 auto" }}>
            Premium artisan jewellery crafted beautifully—every piece made to
            shine your elegance.
          </p>
        </div>

        {/* Responsive Footer Grid */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {/* Collapsible Columns for MOBILE */}
          {Object.keys(footerMenu).map((title, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "1rem",
              }}
            >
              {/* Title */}
              <h3
                onClick={() => toggleAccordion(title)}
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  marginBottom: "0.7rem",
                  color: "#1e293b",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {title.toUpperCase()}
                <span style={{ fontSize: "1.5rem" }}>
                  {openAccordion === title ? "−" : "+"}
                </span>
              </h3>

              {/* Dropdown Items - visible only when open on mobile */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  maxHeight: openAccordion === title ? "400px" : "0px",
                  overflow: "hidden",
                  transition: "0.4s",
                }}
              >
                {footerMenu[title].map((item) => (
                  <li key={item.label} style={{ marginBottom: "0.7rem" }}>
                    <Link
                      to={item.path}
                      style={{
                        color: "#64748b",
                        textDecoration: "none",
                        transition: "0.3s",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#FF6B6B")}
                      onMouseLeave={(e) => (e.target.style.color = "#64748b")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                marginBottom: "1rem",
                color: "#1e293b",
              }}
            >
              NEWSLETTER
            </h3>

            <p style={{ color: "#64748b", marginBottom: "1rem" }}>
              Subscribe for offers and latest designs.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) {
                  alert(`Subscribed with: ${email}`);
                  setEmail("");
                }
              }}
            >
              <input
                type="email"
                placeholder="Your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "12px",
                  border: "1px solid #E2E8F0",
                  marginBottom: "0.7rem",
                }}
              />

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  background:
                    "linear-gradient(135deg, #FF6B6B 0%, #A78BFA 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            padding: "2rem 0",
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "0.95rem",
          }}
        >
          Lara & Co. © 2025 | Crafted With <MagnetIcon />
        </div>
      </div>
    </footer>
  );
}
