import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AvatarIcon, BerryMinimum, BraceletsIcon, CartIcon, ClassicVanilla, DayThemeIcon, EarringsIcon, Gift2100To3500Icon, Gift3600To5000Icon, GiftUnder2000Icon, GirlIcon, HomeIcon, HoopsIcon, LilScoopsies, LoginIcon, LuxuriusLime, NecklaceIcon, NightThemeIcon, PremiumDiamondLogo, RingsIcon, SassySorbet, ShopIcon, SimpleSearchIcon, Sorbet, SorbetSensation, SummerFling } from "../components/Icons";
import { CitrusIcon, EarIcon, GiftIcon, IceCream, IceCream2Icon, SaladIcon, SearchIcon, Settings, ShoppingBagIcon } from "lucide-react";


export default function NavbarResponsive({
  theme = "light",
  onThemeToggle = () => {},
  isLoggedIn = false,
  currentUser = null,
  onLogin = () => {},
  onLogout = () => {},
  cartCount = 0,
}) {
  const location = useLocation();
  const navigate = useNavigate();


  // UI state
  const [activeDropdown, setActiveDropdown] = useState(null); // desktop dropdown
  const [drawerOpen, setDrawerOpen] = useState(false); // mobile drawer
  const [mobileAccordions, setMobileAccordions] = useState({}); // mobile accordion open state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);

  // refs
  const drawerRef = useRef(null);
  const settingsRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  // Links & dropdown items (kept from your original)
  const links = [
    { path: "https://kailashrwt.github.io/E-commerce_project/", label: "Home", icon: <HomeIcon /> },
    { path: "/shop", label: "Shop", icon: <ShoppingBagIcon />, dropdown: true },
    { path: "/flavors", label: "Flavors", icon: <IceCream />, dropdown: true },
    { path: "/sorbetgirl", label: "Sorbet Girl", icon: <GirlIcon /> , dropdown: true },
    { path: "/gifts", label: "Gifts", icon: <GiftIcon />, dropdown: true },
    { path: "/sale", label: "Sale", icon: <SaladIcon /> },
  ];

  const dropdownItems = {
    Shop: [
      { label: "Hoops", path: "/client/shop/hoops", icon: <HoopsIcon /> },
      { label: "Earrings", path: "/client/shop/earrings", icon: <EarringsIcon /> },
      { label: "Necklace", path: "/client/shop/necklace", icon: <NecklaceIcon /> },
      { label: "Bracelets", path: "/client/shop/bracelets", icon: <BraceletsIcon /> },
      { label: "Rings", path: "/client/shop/rings", icon: <RingsIcon /> },
    ],
    Flavors: [
      { label: "Citrus Chic", path: "/client/flavors/citruschic", icon: <CitrusIcon /> },
      { label: "Berry Minimum", path: "/client/flavors/berryminimum", icon: <BerryMinimum /> },
      { label: "Classic Vanilla", path: "/client/flavors/classicvanilla", icon: <ClassicVanilla /> },
      { label: "Luxurious Lime", path: "/client/flavors/luxuriouslime", icon: <LuxuriusLime /> },
      { label: "Sorbet Sensation", path: "/client/flavors/sorbetsensation", icon: <SorbetSensation /> },
      { label: "Summer Fling Collection", path: "/client/flavors/summerfling", icon: <SummerFling /> },
    ],
    "Sorbet Girl": [
      { label: "Lil Scoopsies", path: "/sorbetgirl/lilscoopsies", icon: <LilScoopsies /> },
      { label: "Sassy Sorbet", path: "/sorbetgirl/sassysorbet", icon: <SassySorbet /> },
    ],
    Gifts: [
      { label: "Gift under-₹2000", path: "/gifts/giftunder2000", icon: <GiftUnder2000Icon /> },
      { label: "Gift ₹2100-₹3500", path: "/gifts/gift2100to3500", icon: <Gift2100To3500Icon /> },
      { label: "Gift ₹3600-₹5000", path: "/gifts/gift3600to5000", icon: <Gift3600To5000Icon /> },
    ],
  };

  // Theme palette (kept same)
  const themeColors = {
    light: {
      background: "#F8FAFC",
      text: "#0F172A",
      navBackground:
        "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)",
      cardBackground: "#FFFFFF",
      border: "rgba(15, 23, 42, 0.1)",
    },
    dark: {
      background: "#0F172A",
      text: "#F8FAFC",
      navBackground:
        "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)",
      cardBackground: "#1E293B",
      border: "rgba(248, 250, 252, 0.1)",
    },
  };

  const openDropdown = (label) =>{
    if (closeTimeoutRef.current){
      clearTimeout(closeTimeoutRef.current);
    }
    setActiveDropdown(label);
  }

  const closeDropdown = () =>{
    closeTimeoutRef.current = setTimeout(() =>{
      setActiveDropdown(null);
    }, 300);
  };

  const colors = {
    gradient: {
      primary: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
      secondary: "linear-gradient(135deg, #4ECDC4 0%, #6EFAF4 100%)",
      accent: "linear-gradient(135deg, #FFD166 0%, #FFE08E 100%)",
      purple: "linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)",
      pink: "linear-gradient(135deg, #FF85A1 0%, #FFB6C1 100%)",
      blue: "linear-gradient(135deg, #6D9EEB 0%, #9BC2F0 100%)",
      rainbow: "linear-gradient(135deg, #FF6B6B, #FFD166, #06D6A0, #6D9EEB, #A78BFA)",
    },
  };

  const currentTheme = themeColors[theme] || themeColors.light;

  // Utilities
  const isLinkActive = (linkItem) => {
    if (linkItem.path === "/") return location.pathname === "/";
    return location.pathname.startsWith(linkItem.path);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
      setDrawerOpen(false);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen((s) => !s);
  };

  const closeDrawer = () => setDrawerOpen(false);

  const handleClickOutside = (e) => {
    if (drawerOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
      closeDrawer();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setSettingsOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      onLogout();
      alert("Logged out successfully!");
    } else {
      navigate("/login");
    }
    setSettingsOpen(false);
    setDrawerOpen(false);
  };

  const toggleMobileAccordion = (label) => {
    setMobileAccordions((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  if (currentUser?.role === "admin" && !isLoggedIn) {
    return (
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0.8rem 1rem",
          backdropFilter: "blur(10px)",
          background: theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(15,23,42,0.9)",
          color: theme === "light" ? "#0F172A" : "#F8FAFC",
          borderBottom: `1px solid ${currentTheme.border}`,
        }}
      >
        <Link
          to="/login"
          style={{
            padding: "0.55rem 0.9rem",
            background: "linear-gradient(90deg,#3B82F6,#6D9EEB)",
            color: "#fff",
            borderRadius: 10,
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Login
        </Link>
      </nav>
    );
  }

  if (currentUser?.role === "admin" && isLoggedIn) {
    return (
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0.8rem 1rem",
          backdropFilter: "blur(10px)",
          background: theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(15,23,42,0.9)",
          color: theme === "light" ? "#0F172A" : "#F8FAFC",
          borderBottom: `1px solid ${currentTheme.border}`,
        }}
      >
      </nav>
    );
  }

  const css = `
    /* Basic reset for this component scope */
    .lr-navbar { position: fixed; top:0; left:0; right:0; z-index:1100; backdrop-filter: blur(18px); border-bottom:1px solid ${currentTheme.border}; background: ${currentTheme.navBackground}; transition: all .25s ease; }
    .lr-container { max-width:100%; display:flex; align-items:center; justify-content:space-between; padding: 0.9rem 1.2rem; gap:1rem; box-sizing:border-box; }
    .lr-logo { font-size:1.6rem; font-weight:900; background: ${colors.gradient.rainbow}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; cursor:pointer; display:flex; align-items:center; gap:0.5rem; text-decoration:none; }
    .lr-links { display:flex; gap:0.6rem; align-items:center; flex:1; margin-left:1rem; }
    .lr-link { padding:0.55rem 0.9rem; border-radius:10px; font-weight:700; text-decoration:none; display:flex; align-items:center; gap:0.45rem; white-space:nowrap; cursor:pointer; color:${currentTheme.text}; transition:all .18s ease; }
    .lr-link.active { color:#fff; background: linear-gradient(135deg,#6D9EEB,#9BC2F0); box-shadow:0 6px 20px rgba(0,0,0,0.12); }
    .lr-actions { display:flex; gap:0.6rem; align-items:center; flex-shrink:0; }
    .lr-search { position:relative; display:flex; align-items:center; }
    .lr-search-input { padding:0.5rem 0.9rem 0.5rem 2.6rem; border-radius:999px; border:1px solid ${currentTheme.border}; outline:none; font-size:0.9rem; width:180px; transition:all .22s ease; background:${theme === 'dark' ? 'rgba(30,41,59,0.8)' : 'rgba(255,255,255,0.9)'}; color:${currentTheme.text}; }
    .lr-search-icon { position:absolute; left:8px; top:50%; transform:translateY(-50%); cursor:pointer; font-size:0.95rem; }
    .lr-settings { width:40px; height:40px; border-radius:999px; display:flex; align-items:center; justify-content:center; cursor:pointer; border:none; background:transparent; color:${currentTheme.text}; }
    .lr-cart { width:42px; height:42px; border-radius:999px; display:flex; align-items:center; justify-content:center; cursor:pointer; position:relative; background:transparent; }
    .lr-badge { position:absolute; top:-6px; right:-6px; min-width:18px; height:18px; border-radius:999px; display:flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:800; color:#fff; background: linear-gradient(135deg,#FF6B6B,#FF8E8E); }
    .lr-hamburger { display:none; width:44px; height:44px; align-items:center; justify-content:center; border-radius:10px; cursor:pointer; background:transparent; border:none; }
    /* Dropdown */
    .lr-dropdown { position:absolute; top:calc(100% -2px); left:50%; transform:translateX(-50%); margin-top:0.5rem; min-width:220px; border-radius:12px; overflow:hidden; box-shadow:0 12px 40px rgba(0,0,0,0.12); background:${theme === 'dark' ? 'rgba(30,41,59,0.95)' : 'rgba(255,255,255,0.97)'}; border:1px solid ${currentTheme.border}; z-index:2200; animation: dropdownFade .22s ease; transition: none; }
    .lr-dropdown a { display:flex; gap:0.5rem; padding:0.7rem 1rem; text-decoration:none; color:${theme === 'dark' ? '#F8FAFC' : '#0F172A'}; font-weight:600; }
    @keyframes dropdownFade { from {opacity:0; transform: translateX(-50%) translateY(-8px);} to {opacity:1; transform: translateX(-50%) translateY(0);} }
    /* Drawer (mobile) */
    .lr-drawer-backdrop { position:fixed; inset:0; background: rgba(2,6,23,0.45); z-index:1300; opacity:0; pointer-events:none; transition:opacity .2s ease; }
    .lr-drawer-backdrop.open { opacity:1; pointer-events:auto; }
    .lr-drawer { position:fixed; left:0; top:0; bottom:0; width:300px; max-width:92%; transform:translateX(-110%); background:${currentTheme.cardBackground}; box-shadow: 0 20px 60px rgba(2,6,23,0.35); z-index:1400; transition:transform .28s cubic-bezier(.2,.9,.3,1); padding:1rem; overflow:auto; border-right:1px solid ${currentTheme.border}; }
    .lr-drawer.open { transform:translateX(0); }
    .lr-drawer .drawer-header { display:flex; align-items:center; justify-content:space-between; gap:0.5rem; margin-bottom:0.6rem; }
    .lr-drawer a { display:block; padding:0.6rem 0.4rem; text-decoration:none; color:${currentTheme.text}; font-weight:700; border-radius:8px; }
    .lr-accordion-btn { width:100%; display:flex; justify-content:space-between; align-items:center; padding:0.55rem 0.4rem; background:transparent; border:none; font-weight:800; cursor:pointer; border-radius:8px; }
    .lr-accordion-panel { padding:0.2rem 0.5rem 0.8rem 0.6rem; }
    .lr-drawer .sub-link { padding:0.45rem 0.4rem; font-weight:600; }
    /* Responsive breakpoints */
    @media (max-width: 900px) {
      .lr-links { display:none; }
      .lr-search-input { width:120px; display:${searchOpen ? "block" : "none"}; }
      .lr-hamburger { display:flex; }
      .lr-search-input.always-mobile { display:block; width:100%; }
    }
  `;

  return (
    <>
      <style>{css}</style>

      <nav className="lr-navbar" aria-label="Main navigation">
        <div className="lr-container" style={{ gap: 12 }}>
  
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            
            <button
              className="lr-hamburger"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              onClick={toggleDrawer}
              title="Menu"
              style={{
                border: "none",
                background: drawerOpen ? "rgba(0,0,0,0.06)" : "transparent",
              }}
            >
              <span style={{ fontSize: 20 }}>{drawerOpen ? "✖️" : "☰"}</span>
            </button>

            <Link to="/" className="lr-logo" onClick={() => setDrawerOpen(false)}>
              <span style={{ fontSize: 20 }}><PremiumDiamondLogo  className="w-20 h-20"/> </span>
              <span style={{ letterSpacing: -0.5 }}>Lara</span>
            </Link>
          </div>

          {/* Center links (desktop) */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
            <div className="lr-links" role="menubar" aria-hidden={false}>
              {links.map((linkItem) => {
                const active = isLinkActive(linkItem);
                return (
                  <div
                    key={linkItem.path}
                    style={{ position: "relative" }}
                    onMouseEnter={() => {
                      if (window.innerWidth > 900 && linkItem.dropdown) openDropdown(linkItem.label);
                    }}
                    onMouseLeave={() => {
                      if (window.innerWidth > 900 && linkItem.dropdown) closeDropdown();
                    }}
                  >
                    <Link
                      to={linkItem.path}
                      className={"lr-link" + (active ? " active" : "")}
                      onClick={() => setDrawerOpen(false)}
                      aria-haspopup={linkItem.dropdown ? "true" : "false"}
                      aria-expanded={activeDropdown === linkItem.label}
                    >
                      <span style={{ fontSize: 16 }}>{linkItem.icon}</span>
                      <span>{linkItem.label}</span>
                    </Link>

                    {/* Desktop dropdown */}
                    {linkItem.dropdown && dropdownItems[linkItem.label] && activeDropdown === linkItem.label && (
                      <div className="lr-dropdown" role="menu">
                        {dropdownItems[linkItem.label].map((d, i) => (
                          <Link key={i} to={d.path} onClick={() => setActiveDropdown(null)} role="menuitem">
                            <span style={{ fontSize: 15 }}>{d.icon}</span>
                            <span>{d.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lr-actions">
            {/* Search (desktop & toggled mobile) */}
            <div className="lr-search" style={{ minWidth: 40 }}>
              <form onSubmit={handleSearchSubmit}>
                <input
                  className={`lr-search-input ${window.innerWidth <= 900 ? "always-mobile" : ""}`}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search"
                />
              </form>
              <button
                onClick={() => {
                  if (window.innerWidth <= 900) {
                    // On small screens open drawer and focus search there
                    setDrawerOpen(true);
                    setTimeout(() => {
                      const input = document.querySelector(".lr-drawer input[type=text]");
                      if (input) input.focus();
                    }, 200);
                  } else {
                    setSearchOpen((s) => !s);
                  }
                }}
                className="lr-search-icon"
                aria-label="Toggle search"
                title="Search"
                style={{ background: "transparent", border: "none" }}
              >
                <SearchIcon />
              </button>
            </div>

            <div style={{ position: "relative" }} ref={settingsRef}>
              <button
                className="lr-settings"
                aria-haspopup="true"
                aria-expanded={settingsOpen}
                onClick={() => setSettingsOpen((s) => !s)}
                title="Settings"
              >
                <Settings />
              </button>

              {settingsOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    minWidth: 180,
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.16)",
                    background: theme === "dark" ? "rgba(30,41,59,0.96)" : "rgba(255,255,255,0.96)",
                    border: `1px solid ${currentTheme.border}`,
                    zIndex: 2200,
                  }}
                >
                  <button
                    onClick={() => {
                      onThemeToggle();
                      setSettingsOpen(false);
                    }}
                    style={{
                      display: "flex",
                      gap: 8,
                      padding: "0.6rem 0.9rem",
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontWeight: 700,
                      color: currentTheme.text,
                    }}
                  >
                    <span>{theme === "dark" ? <DayThemeIcon /> : <NightThemeIcon />}</span>
                    <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                  </button>

                  <button
                    onClick={handleAuthAction}
                    style={{
                      display: "flex",
                      gap: 8,
                      padding: "0.6rem 0.9rem",
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontWeight: 700,
                      color: currentTheme.text,
                    }}
                  >
                    <span>{isLoggedIn ? <AvatarIcon /> : <LoginIcon />}</span>
                    <span>{isLoggedIn ? "Logout" : "Login"}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              className="lr-cart"
              aria-label="Cart"
              onClick={() => navigate("/cart")}
              title="Cart"
            >
              <span style={{ fontSize: 18 }}><CartIcon /></span>
              {cartCount > 0 && <span className="lr-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      <div className={`lr-drawer-backdrop ${drawerOpen ? "open" : ""}`} style={{ display: drawerOpen ? "block" : "none" }} aria-hidden={!drawerOpen}></div>

      <aside
        className={`lr-drawer ${drawerOpen ? "open" : ""}`}
        ref={drawerRef}
        aria-hidden={!drawerOpen}
        aria-label="Mobile menu"
        role="dialog"
      >
        <div className="drawer-header">
          <Link to="/" className="lr-logo" onClick={() => setDrawerOpen(false)}>
            <span style={{ fontSize: 18 }}><PremiumDiamondLogo /></span>
            <span>Lara</span>
          </Link>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={() => {
                onThemeToggle();
                setDrawerOpen(false);
              }}
              style={{
                padding: "0.45rem 0.6rem",
                borderRadius: 8,
                background: "transparent",
                border: `1px solid ${currentTheme.border}`,
                fontWeight: 700,
                cursor: "pointer",
              }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <DayThemeIcon /> : <NightThemeIcon />}
            </button>
            <button
              onClick={() => setDrawerOpen(false)}
              style={{
                padding: "0.45rem 0.6rem",
                borderRadius: 8,
                background: "transparent",
                border: `1px solid ${currentTheme.border}`,
                cursor: "pointer",
              }}
              aria-label="Close menu"
            >
              ✖
            </button>
          </div>
        </div>

        <div style={{ marginBottom: 10 }}>
          <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: "0.6rem 0.9rem",
                borderRadius: 8,
                border: `1px solid ${currentTheme.border}`,
                fontSize: 15,
                background: currentTheme.cardBackground,
                color: currentTheme.text,
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0.6rem 0.8rem",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontWeight: 800,
                background: "linear-gradient(90deg,#6D9EEB,#9BC2F0)",
                color: "#fff",
              }}
            >
              Go
            </button>
          </form>
        </div>

        <nav aria-label="Mobile navigation" style={{ display: "grid", gap: 6 }}>
          {links.map((linkItem) => {
            const hasDropdown = !!dropdownItems[linkItem.label];
            return (
              <div key={linkItem.path} style={{ display: "grid", gap: 4 }}>
                {!hasDropdown && (
                  <Link to={linkItem.path} className="lr-link" onClick={() => setDrawerOpen(false)}>
                    <span style={{ fontSize: 16 }}>{linkItem.icon}</span>
                    <span>{linkItem.label}</span>
                  </Link>
                )}

                {hasDropdown && (
                  <>
                    <button
                      className="lr-accordion-btn"
                      onClick={() => toggleMobileAccordion(linkItem.label)}
                      aria-expanded={!!mobileAccordions[linkItem.label]}
                    >
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 16 }}>{linkItem.icon}</span>
                        <span>{linkItem.label}</span>
                      </div>
                      <div style={{ fontWeight: 900 }}>{mobileAccordions[linkItem.label] ? "−" : "+"}</div>
                    </button>

                    {mobileAccordions[linkItem.label] && (
                      <div className="lr-accordion-panel" role="region" aria-hidden={!mobileAccordions[linkItem.label]}>
                        {dropdownItems[linkItem.label].map((d, i) => (
                          <Link
                            key={i}
                            to={d.path}
                            className="sub-link"
                            onClick={() => setDrawerOpen(false)}
                          >
                            <span style={{ fontSize: 14 }}>{d.icon}</span>
                            <span style={{ marginLeft: 8 }}>{d.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </nav>

        <div style={{ marginTop: 12, borderTop: `1px solid ${currentTheme.border}`, paddingTop: 12, display: "grid", gap: 8 }}>
          <button
            onClick={handleAuthAction}
            style={{
              padding: "0.7rem 0.8rem",
              borderRadius: 10,
              border: "none",
              fontWeight: 800,
              cursor: "pointer",
              background: "linear-gradient(90deg,#FF6B6B,#FF8E8E)",
              color: "#fff",
            }}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>

          <Link to="/cart" onClick={() => setDrawerOpen(false)} style={{ padding: "0.6rem", fontWeight: 800 }}>
            Cart ({cartCount})
          </Link>

          {currentUser && (
            <div style={{ padding: "0.6rem 0.3rem", fontWeight: 700 }}>
              Hello, {currentUser.name || currentUser.email || "User"}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
