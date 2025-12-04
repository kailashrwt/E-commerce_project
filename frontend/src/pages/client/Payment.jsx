import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { PaymentIcon } from "../../components/Icons";

const Payment = ({ theme = "light" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const query = new URLSearchParams(location.search);
  const productId = query.get("productId");

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:6060/api/products/${productId}`);
      if (res.data.success) setProduct(res.data.product);
    } catch (err) {
      console.log("Product fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!product) return <div className="text-center p-10">Product Not Found</div>;

  const totalPrice = qty * product.price;

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please Login first");
      return navigate("/login");
    }

    const res = await axios.post("http://localhost:6060/api/payment/create-order", {
      amount: totalPrice,
    });

    const order = res.data.order;
    if (!order) return alert("Error creating order");

    await loadRazorpay();

    const options = {
      key: "rzp_test_Rl9ik50h8bQyK0",
      amount: order.amount,
      currency: "INR",
      name: "Lara Store",
      description: "Test Payment Only",
      order_id: order.id,

      handler: async function (response) {
        await axios.post(
          "http://localhost:6060/api/order/create",
          {
            productId,
            qty,
            totalAmount: totalPrice,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Payment Successful (Test Mode)");
        navigate("/my-orders");
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div
      className="p-4 md:p-8 max-w-4xl mx-auto"
      style={{
        background: isDark ? "#0f172a" : "#F8FAFC",
        color: isDark ? "white" : "black",
        minHeight: "80vh",
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">🧾 Checkout</h1>

      <div
        className="p-4 sm:p-6 rounded-xl shadow-lg"
        style={{ background: isDark ? "#1e293b" : "white" }}
      >
        {/* NEW RESPONSIVE FIXED FLEX */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
          <img
            src={`http://localhost:6060${product.image}`}
            alt={product.name}
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover rounded-lg shadow-md"
          />

          {/* TEXT SECTION */}
          <div className="w-full text-center md:text-left">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="opacity-70 text-sm sm:text-base">{product.category}</p>

            <p className="text-green-500 font-bold text-2xl mt-2">
              ₹{product.price}
            </p>

            {/* Qty Buttons */}
            <div className="flex items-center gap-3 justify-center md:justify-start mt-4">
              <button
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                -
              </button>

              <span className="px-4 text-lg font-semibold">{qty}</span>

              <button
                onClick={() => setQty(qty + 1)}
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                +
              </button>
            </div>

            <p className="text-lg mt-4">
              Total:{" "}
              <span className="font-bold text-green-500">₹{totalPrice}</span>
            </p>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full py-3 mt-8 rounded-lg text-white font-semibold flex items-center justify-center gap-2 text-lg"
          style={{
            background: "linear-gradient(135deg,#FF6B6B,#FF8E8E)",
            boxShadow: "0 4px 18px rgba(255,107,107,0.3)",
          }}
        >
          Pay Now <PaymentIcon className="w-5 h-5 sm:h-6 sm:w-6" />
        </button>
      </div>
    </div>
  );
};

export default Payment;
