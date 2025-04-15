import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductDetail from "./ProductDetail";
import axios from "axios";

function Products() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Format harga dengan pemisah ribuan berupa titik
    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    // Ambil data produk dari API MongoDB
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://backend-lumina-coffe.vercel.app/api/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Gagal mengambil data produk", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-[#2D1E15] text-white px-4 py-8 relative">
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-8 text-center">Our Products</h1>

            {/* Grid Produk Responsif */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {products.map((product) => (
                    <motion.div
                        key={product._id}
                        whileHover={{ scale: 1.03 }}
                        className="bg-gray-100 text-black rounded-xl p-4 shadow-md border border-yellow-500 hover:shadow-lg transition"
                    >
                        <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-lg"
                        />
                        <div className="mt-4 text-center">
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-yellow-600 font-bold text-lg">{formatPrice(product.price)}</p>
                            <button
                                onClick={() => setSelectedProduct(product)}
                                className="mt-3 w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition font-semibold"
                            >
                                Pesan
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal Detail Produk */}
            {selectedProduct && (
                <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            )}
        </div>
    );
}

export default Products;
