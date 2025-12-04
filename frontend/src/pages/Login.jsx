import React, { useState, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginIcon, PremiumDiamondLogo } from '../components/Icons';
import { LogIn, LogInIcon } from 'lucide-react';

const THEME_CONFIG = {
  light: {
    background: "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)",
    cardBackground: "#FFFFFF",
    text: "#0F172A",
    border: "rgba(15, 23, 42, 0.1)",
    inputBackground: "rgba(255, 255, 255, 0.9)",
  },
  dark: {
    background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    cardBackground: "#1E293B",
    text: "#F8FAFC",
    border: "rgba(248, 250, 252, 0.1)",
    inputBackground: "rgba(30, 41, 59, 0.8)",
  }
};

const COLORS = {
  gradients: {
    primary: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
    secondary: "linear-gradient(135deg, #4ECDC4 0%, #6EFAF4 100%)",
    rainbow: "linear-gradient(135deg, #FF6B6B, #FFD166, #06D6A0, #6D9EEB, #A78BFA)",
  }
};

const API_URL = "http://localhost:6060/api/auth/login";

const Login = ({ theme = "light", onLogin = null, onLogout = null, isLoggedIn = false, currentUser = null }) => {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const currentTheme = useMemo(() => THEME_CONFIG[theme] || THEME_CONFIG.light, [theme]);

  const styles = useMemo(() => {
    const mobile = window.innerWidth <= 520;
    return {
      container: {
        minHeight: "100vh",
        background: currentTheme.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: mobile ? "1.5rem" : "2rem",
      },
      card: {
        background: currentTheme.cardBackground,
        padding: mobile ? "2rem" : "3rem",
        borderRadius: "20px",
        width: mobile ? "100%" : "450px",
        boxShadow: theme === "dark"
          ? "0 20px 40px rgba(0,0,0,0.3)"
          : "0 20px 40px rgba(0,0,0,0.08)",
        border: `1px solid ${currentTheme.border}`,
        textAlign: "center",
      },
      title: {
        fontSize: mobile ? "2rem" : "2.5rem",
        fontWeight: "900",
        background: COLORS.gradients.rainbow,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "0.5rem",
      },
      subtitle: {
        opacity: 0.8,
        color: currentTheme.text,
        marginBottom: mobile ? "1.5rem" : "2rem",
        fontSize: mobile ? "0.9rem" : "1rem",
      },
      error: {
        color: "#FF6B6B",
        backgroundColor: "rgba(255, 107, 107, 0.12)",
        padding: "0.8rem",
        borderRadius: "8px",
        border: "1px solid rgba(255,107,107,0.3)",
        marginBottom: "1rem",
        fontSize: mobile ? "0.85rem" : "0.95rem",
      },
      form: {
        display: "flex",
        flexDirection: "column",
        gap: "1.3rem",
      },
      inputGroup: {
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
      },
      label: {
        fontWeight: "600",
        fontSize: "0.9rem",
        color: currentTheme.text,
      },
      input: {
        width: "100%",
        padding: mobile ? "0.8rem 1rem" : "1rem 1.2rem",
        borderRadius: "12px",
        border: `1px solid ${currentTheme.border}`,
        background: currentTheme.inputBackground,
        fontSize: "0.9rem",
        outline: "none",
        color: currentTheme.text,
        transition: "0.3s",
      },
      forgotPassword: {
        color: "#FF6B6B",
        textDecoration: "none",
        fontSize: "0.85rem",
        fontWeight: "600",
        marginTop: "0.3rem",
        display: "inline-block",
      },
      loginButton: {
        marginTop: "1rem",
        padding: mobile ? "0.9rem" : "1rem",
        borderRadius: "25px",
        border: "none",
        background: COLORS.gradients.primary,
        color: "white",
        fontSize: mobile ? "0.95rem" : "1rem",
        fontWeight: "700",
        cursor: "pointer",
        transition: "0.3s",
        width: "100%",
      },
      registerSection: {
        marginTop: "2rem",
        paddingTop: "1.5rem",
        borderTop: `1px solid ${currentTheme.border}`,
        fontSize: "0.9rem",
        opacity: 0.85,
      },
      registerLink: {
        color: "#4ECDC4",
        fontWeight: "700",
        marginLeft: "0.5rem",
        textDecoration: "none",
      }
    };
  }, [currentTheme, theme]);


  const handleInputChange = useCallback((field) => (e) => {
    setFormData((p) => ({ ...p, [field]: e.target.value }));
    if (error) setError("");
  }, [error]);

  const handleLoginSuccess = useCallback((token, user) => {
    if (typeof onLogin === "function") {
      onLogin(token, user);
    } else {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [onLogin]);

  const handleLogout = useCallback(() => {
    if (typeof onLogout === "function") {
      onLogout();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    }
  }, [onLogout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const resText = await res.text();
      if (!res.ok) throw new Error(JSON.parse(resText).message || "Login failed");
      const data = JSON.parse(resText);
      handleLoginSuccess(data.token, data.user);
      if (data.user.role === "admin") navigate("/admin-dashboard");
      else navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn && currentUser) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Welcome {currentUser.email}</h1>
          <button style={styles.loginButton} onClick={() => navigate("/")}>Go Home</button>
          <button style={{ ...styles.loginButton, marginTop: "1rem" }} onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}><PremiumDiamondLogo className='w-8 h-8' /> Welcome Back!</h1>
        <p style={styles.subtitle}>Please enter your email and password</p>

        {error && <div style={styles.error}>❌ {error}</div>}

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input type="email" value={formData.email} onChange={handleInputChange("email")} style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input type="password" value={formData.password} onChange={handleInputChange("password")} style={styles.input} />
            <Link to="/forget-password" style={styles.forgotPassword}>Forgot your password?</Link>
          </div>

          <button type="submit" style={styles.loginButton}>
            {isLoading ? (
              "⏳ Logging in..."
            ) : (
              <span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                <LogIn />
                Login
              </span>
            )}
          </button>

        </form>

        <div style={styles.registerSection}>
          New customer?
          <Link to="/register" style={styles.registerLink}>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
