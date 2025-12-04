import React, { useEffect, useState } from "react";
import { Upload, ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = ({ theme = "light" }) => {
    const isDark = theme === "dark";
    const { id } = useParams();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState(null);
    const [form, setForm] = useState({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
        image: null,
        oldImage: "",
    });

    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:6060/api/products/${id}`);
                if (res.data.success) {
                    const p = res.data.product;
                    setForm({
                        name: p.name,
                        price: p.price,
                        category: p.category,
                        stock: p.stock,
                        description: p.description,
                        image: null,
                        oldImage: p.image,
                    });
                    setPreviewImage(`http://localhost:6060${p.image}`);
                }
            } catch (err) {
                console.error("Fetch error:", err);
                alert("Failed to load product");
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, image: file });

        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("price", form.price);
            formData.append("category", form.category);
            formData.append("stock", form.stock);
            formData.append("description", form.description);

            if (form.image) formData.append("image", form.image);

            const res = await axios.put(
                `http://localhost:6060/api/products/${id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (res.data.success) {
                alert("Product updated successfully!");
                navigate("/admin/manage-products");
            }
        } catch (err) {
            console.error("Update error:", err);
            alert("Failed to update product");
        }
    };

    return (
        <div
            className="p-6 rounded-xl shadow-xl"
            style={{
                background: isDark ? "#0f172a" : "#222020ff",
                color: isDark ? "#f8fafc" : "#0f172a",
                border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
                minHeight: "80vh",
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">✏️ Edit Product</h1>

                <Link
                    to="/admin/manage-products"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                >
                    <ArrowLeft size={18} />
                    Back
                </Link>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Name */}
                <div className="flex flex-col">
                    <label className="font-semibold mb-1">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="p-3 rounded-lg border"
                        style={{
                            background: isDark ? "#1e293b" : "#f8fafc",
                            borderColor: isDark ? "#334155" : "#cbd5e1",
                        }}
                        required
                    />
                </div>

                {/* Price */}
                <div className="flex flex-col">
                    <label className="font-semibold mb-1">Price (₹)</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        className="p-3 rounded-lg border"
                        style={{
                            background: isDark ? "#1e293b" : "#f8fafc",
                            borderColor: isDark ? "#334155" : "#cbd5e1",
                        }}
                        required
                    />
                </div>

                {/* Category */}
                <div className="flex flex-col">
                    <label className="font-semibold mb-1">Category</label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="p-3 rounded-lg border"
                        style={{
                            background: isDark ?  "#1e293b" : "#f8fafc",
                            borderColor: isDark ? "#334155" : "#cbd5e1",
                            color: isDark ? "#f8fafc" : "#0f172a"
                        }}
                    >
                        <option value="">Select Category</option>
                        <option value="Rings">Rings</option>
                        <option value="Necklace">Necklace</option>
                        <option value="Bracelet">Bracelets</option>
                        <option value="Earrings">Earrings</option>
                        <option value="Hoops">Hoops</option>
                        <option value="Citrus Chic">Citrus-Chic</option>
                        <option value="Berry Minimum">Berry-Minimum</option>
                        <option value="Classic Vanilla">Classic-Vanilla</option>
                        <option value="Luxurious Lime">Luxurious-Lime</option>
                        <option value="Sorbet Sensation">Sorbet-Sensation</option>
                        <option value="Summer Fling">Summer-Fling</option>
                        <option value="Lil Scoopsies">Lil-Scoopsies</option>
                        <option value="Sassy Sorbet">Sassy-Sorbet</option>
                    </select>
                </div>

                {/* Stock */}
                <div className="flex flex-col">
                    <label className="font-semibold mb-1">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        className="p-3 rounded-lg border"
                        style={{
                            background: isDark ?  "#1e293b" : "#f8fafc",
                            borderColor: isDark ? "#334155" : "#cbd5e1",
                            color : isDark ? "#f8fac": "#0f172a"
                        }}
                        required
                    />
                </div>

                {/* Image */}
                <div className="md:col-span-2">
                    <label className="font-semibold mb-2 block">Product Image</label>

                    <div
                        className="flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-xl cursor-pointer"
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="hidden"
                            id="uploadImage"
                        />
                        <label htmlFor="uploadImage" className="cursor-pointer">
                            <div className="flex flex-col items-center">
                                <Upload size={40} className="mb-2 text-gray-500" />
                                <p className="font-medium">
                                    Click to upload image (JPG/PNG)
                                </p>
                            </div>
                        </label>

                        {previewImage && (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="mt-4 w-40 h-40 object-cover rounded-lg shadow"
                            />
                        )}
                    </div>
                </div>

                <div className="flex flex-col mb:col-span-2">
                    <label className="font-semibold mb-1">Description</label>
                    <textarea name="description" rows="4" value={form.description} onChange={handleChange} className="p-3 rounded-lg border" style={{
                        background: isDark ? "#1e293b" : "#f8fafc",
                        borderColor: isDark ? "#334155" : "#cbd5e1",
                        color: isDark ? "#f8fafc" : "#0f172a"
                    }} placeholder="Enter Product description" />
                </div>

                {/* Submit button */}
                <div className="md:col-span-2 mt-4">
                    <button
                        type="submit"
                        className="w-full p-3 rounded-lg text-white font-semibold"
                        style={{
                            background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                        }}
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
