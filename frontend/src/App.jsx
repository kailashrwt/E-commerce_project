import { Suspense, lazy, useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";

import AdminRoute from "./components/AdminRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import AdminLayout from "./layouts/AdminLayout";
import ForgetPassword from "./pages/ForgetPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddToCart from "./pages/AddToCart";
import Cart from "./pages/Cart";
import ResetPassword from "./pages/ResetPassword";
import AdminProfile from "./pages/admin/AdminProfile";
import ManageProducts from "./pages/admin/ManageProducts";
import AdminAddProduct from "./pages/admin/AddProduct";
import MangeOrders from "./pages/admin/MangeOrders";
import ManageCustomer from "./pages/admin/ManageCustomers"
import AdminReports from "./pages/admin/AdminReports";
import Hoops from "./pages/client/shop/Hoops";
import EditProduct from "./pages/admin/EditProduct";
import axios from "axios";
import ProductDetails from "./pages/client/ProductDetails";
import Payment from "./pages/client/Payment";
import Earrings from "./pages/client/shop/Earrings";
import Necklace from "./pages/client/shop/Necklace";
import Bracelets from "./pages/client/shop/Bracelets";
import Rings from "./pages/client/shop/Rings";
import Flavors from "./pages/Flavors";
import CitrusChic from "./pages/client/flavors/CitrusChic";
import BerryMinimum from "./pages/client/flavors/BerryMinimum";
import ClassicVanilla from "./pages/client/flavors/ClassicVanilla";
import LuxuriousLime from "./pages/client/flavors/LuxuriousLime";
import SorbetSensation from "./pages/client/flavors/SorbetSensation";
import SummerFling from "./pages/client/flavors/Summerfling";
import SorbetGirl from "./pages/SorbetGirl";
import LilScoopsies from "./pages/client/sorbet-girl/LilScoopsies";
import SassySorbet from "./pages/client/sorbet-girl/SassySorbet";
import  Gift  from "./pages/Gift";
import GiftUnder2000 from "./pages/client/gifts/GiftUnder2000";
import Gift2100To3500 from "./pages/client/gifts/Gift2100To3500";
import Sale from "./pages/Sale";
import MyOrders from "./pages/MyOrders";
import Gift3600To5000 from "./pages/client/gifts/gift3600to5000";



// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminDashboard = lazy(() =>import("./pages/admin/AdminDashboard"));


// Routes list
const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {path: "/addtocart", component: AddToCart},
  {path: "/cart", component: Cart},
  { path: "/forget-password", component: ForgetPassword },
  { path: "/reset-password/:token", component: ResetPassword },
  {path: "/product/:id", component: ProductDetails},
  {path: "/payment", component: Payment},
  { path: "/shop", component: Shop },
  {path: "/client/shop/hoops", component: Hoops},
  {path: "/client/shop/earrings", component: Earrings},
  {path: "/client/shop/necklace", component: Necklace},
  {path: "/client/shop/bracelets", component: Bracelets},
  {path: "/client/shop/rings", component: Rings},
  {path: "/flavors", component: Flavors},
  {path: "/client/flavors/citruschic", component: CitrusChic},
  {path: "/client/flavors/berryminimum", component: BerryMinimum},
  {path: "/client/flavors/classicvanilla", component: ClassicVanilla},
  {path: "/client/flavors/luxuriouslime", component: LuxuriousLime},
  {path: "/client/flavors/sorbetsensation", component: SorbetSensation},
  {path: "/client/flavors/summerfling", component: SummerFling},
  {path: "/sorbetgirl", component: SorbetGirl},
  {path: "/sorbetgirl/lilscoopsies", component: LilScoopsies},
  {path: "/sorbetgirl/sassysorbet", component: SassySorbet},
  {path: "/gifts", component: Gift},
  {path: "/gifts/giftunder2000", component: GiftUnder2000},
  {path: "/gifts/gift2100to3500", component: Gift2100To3500},
  {path: "/gifts/gift3600to5000", component: Gift3600To5000},
  {path: "/sale", component: Sale},
  {path: "my-orders", component: MyOrders},
];

// Layout Wrapper (Navbar + Footer + Role Protection)
function LayoutWrapper({
  children,
  theme,
  toggleTheme,
  isLoggedIn,
  currentUser,
  onLogin,
  onLogout,
  cartCount,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  // ✅ Role-based page access control
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return; // agar user logged out hai to kuch mat karo

    const user = JSON.parse(userData);

    // 🔹 Admin cannot access frontend pages except /login
    if (user?.role === "admin") {
      if (
        !location.pathname.startsWith("/admin") &&
        location.pathname !== "/login"
      ) {
        navigate("/admin-dashboard", { replace: true });
      }
    }

    // 🔹 Normal user cannot access admin pages
    if (user?.role === "user" && location.pathname.startsWith("/admin")) {
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return (
    <>{!isAdminPage && (
  <Navbar
    theme={theme}
    onThemeToggle={toggleTheme}
    isLoggedIn={isLoggedIn}
    currentUser={currentUser}
    onLogin={onLogin}
    onLogout={onLogout}
    cartCount={cartCount}
  />
)}


      <main className={!isAdminPage ? "pt-20 min-h-[80vh]" : ""}>
        {children}
      </main>

      {!isAdminPage && <Footer theme={theme} />}
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // 🎨 Theme colors
  const themeColors = {
    light: {
      background: "#F8FAFC",
      text: "#0F172A",
      navBackground:
        "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))",
      cardBackground: "#FFFFFF",
      border: "rgba(15, 23, 42, 0.1)",
    },
    dark: {
      background: "#0F172A",
      text: "#F8FAFC",
      navBackground:
        "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8))",
      cardBackground: "#1E293B",
      border: "rgba(248, 250, 252, 0.1)",
    },
  };

  // 🔹 Initialize theme + authentication
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = savedTheme || (systemDark ? "dark" : "light");
    setTheme(initial);
    applyTheme(initial);

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(user));
    }

    const fetchCart = async () =>{
      const token = localStorage.getItem("token");
      if(!token) return setCartCount(0);

      try{
        const res = await axios.get("http://localhost:6060/api/cart/me",{
          headers: {Authorization: `Bearer ${token}`},
        });
        setCartCount(res.data.totalItems || 0);
      }catch (err){
        console.log("Cart Count Error", err);
      }
    };
    fetchCart();

    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);


  // 🌗 Theme toggle logic
  const applyTheme = (themeMode) => {
    const colors = themeColors[themeMode];
    document.documentElement.style.setProperty("--bg-primary", colors.background);
    document.documentElement.style.setProperty("--text-primary", colors.text);
    document.documentElement.style.setProperty("--card-bg", colors.cardBackground);
    document.documentElement.style.setProperty("--border-color", colors.border);
    document.documentElement.className = themeMode;
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  // 🔐 Login handler with redirect
  const handleLogin = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
    setCurrentUser(user);

    // ✅ Redirect based on role
    if (user.role === "admin") {
      window.location.href = "/admin-dashboard";
    } else {
      window.location.href = "/";
    }
  };

  // 🚪 Logout handler with redirect
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setCurrentUser(null);
    window.location.href = "/login"; // ✅ Force clean redirect
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <LayoutWrapper
          theme={theme}
          toggleTheme={()=> setTheme(theme === "light" ? "dark" : "light")}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLogin={handleLogin}
          onLogout={handleLogout}
          cartCount={cartCount}
        >
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-[400px]">
                <LoadingSpinner />
              </div>
            }
          >
            <Routes>


              {routes.map(({ path, component: Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    path === "/login" ? (
                      <Component
                        theme={theme}
                        onLogin={handleLogin}
                        onLogout={handleLogout}
                        isLoggedIn={isLoggedIn}
                        currentUser={currentUser}
                      />
                    ) : (
                      <Component theme={theme}  setCartCount={setCartCount}/>
                    )
                  }
                />
              ))}

              {/* Admin Section */}
              <Route
                path="/admin-dashboard"
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <AdminDashboard
                        theme={theme}
                        currentUser={currentUser}
                        onLogout={handleLogout}
                      />
                    </AdminLayout>
                  </AdminRoute>
                }
              />

              <Route
              path="/admin-profile"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminProfile
                    theme={theme}
                    currentUser={currentUser}
                    onLogout={handleLogout}
                    />
                  </AdminLayout>
                </AdminRoute>
              }
              />

<Route
  path="/admin/manage-products"
  element={
    <AdminRoute>
      <AdminLayout>
        <ManageProducts theme={theme} />
      </AdminLayout>
    </AdminRoute>
  }
/>

<Route
path="/admin/add-product"
element={
  <AdminRoute>
    <AdminLayout>
      <AdminAddProduct theme={theme} />
    </AdminLayout>
  </AdminRoute>
}
/>

<Route 
path="/admin/orders"
element={
  <AdminRoute>
    <AdminLayout>
      <MangeOrders theme={theme} />
    </AdminLayout>
  </AdminRoute>
}
/>

<Route
path="/admin/customers"
element={
  <AdminRoute>
    <AdminLayout>
      <ManageCustomer theme={theme} />
    </AdminLayout>
  </AdminRoute>
}
/>

<Route 
path="/admin/reports"
element={
  <AdminRoute>
    <AdminLayout>
      <AdminReports theme={theme}/>
    </AdminLayout>
  </AdminRoute>
}
/>


<Route
path="/admin-edit-product/:id"
element={
  <AdminRoute>
    <AdminLayout>
      <EditProduct theme={theme}/>
    </AdminLayout>
  </AdminRoute>
}
/>


              {/* 404 */}
              <Route path="*" element={<NotFound theme={theme} />} />
            </Routes>
          </Suspense>
        </LayoutWrapper>
      </Router>
    </ErrorBoundary>
  );
}
