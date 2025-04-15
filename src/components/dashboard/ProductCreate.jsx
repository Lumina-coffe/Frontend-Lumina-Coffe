// frontend/components/AddProduct.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";



const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("description", description);
        formData.append("thumbnail", image);

        try {
            await axios.post("http://localhost:4000/api/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Produk berhasil ditambahkan!");
            navigate("/admin/dashboard");
        } catch (error) {
            console.error("❌ Gagal menambahkan produk:", error.response?.data || error);
            alert("Terjadi kesalahan saat menambahkan produk.");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Tambah Produk Baru
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Nama Produk:</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Harga:</label>
                    <NumberFormat
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                        value={price}
                        onValueChange={(values) => setPrice(values.floatValue)} // Mengambil nilai angka
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="Rp "
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Stok Produk:</label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Deskripsi:</label>
                    <textarea
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-1">Gambar Produk:</label>
                    <input
                        type="file"
                        className="w-full"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                    Tambah Produk
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
