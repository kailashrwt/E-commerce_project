import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:6060/api/products/${id}`);
        if (res.data.success) {
          setProduct(res.data.product);
        }
      } catch (err) {
        console.log("Single Product Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return <h2 className="text-center mt-20">Loading...</h2>;
  if (!product) return <h2 className="text-center mt-20">Product Not Found</h2>;

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">

      {/* PRODUCT IMAGE */}
      <img
        src={`http://localhost:6060${product.image}`}
        alt={product.name}
        className="w-full max-h-[350px] sm:max-h-[450px] object-cover rounded-xl shadow-md"
      />

      {/* TITLE + PRICE */}
      <div className="mt-5 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
        <p className="text-xl sm:text-2xl text-green-500 font-semibold mt-2">
          ₹{product.price}
        </p>
        <p className="opacity-75 mt-1 text-sm sm:text-base">{product.category}</p>
      </div>

      {/* DESCRIPTION */}
      <p className="mt-4 text-base sm:text-lg leading-relaxed">
        {product.description || "No description available."}
      </p>

      {/* BUY NOW BUTTON */}
      <button
        onClick={() => navigate(`/payment?productId=${id}`)}
        className="w-full sm:w-auto mt-6 px-6 py-3 rounded-lg text-white font-semibold text-lg block mx-auto sm:mx-0"
        style={{
          background: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
          boxShadow: "0 4px 15px rgba(255,107,107,0.35)",
        }}
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductDetails;
