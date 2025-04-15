import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import PaymentSuccess from "./PaymentSuccess";
import { useNavigate } from "react-router-dom";

function ProductDetail({ product, onClose }) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [snapToken, setSnapToken] = useState(null);
    const [orderId, setOrderId] = useState(null);

    const unitPrice = product.price;
    const stock = product.stock ?? 20;
    const parsedQuantity = parseInt(quantity, 10);
    const totalPrice = !isNaN(parsedQuantity) ? unitPrice * parsedQuantity : 0;

    const navigate = useNavigate();

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) setQuantity(value);
    };

    const handleQuantityBlur = () => {
        let value = parseInt(quantity, 10);
        if (isNaN(value) || value < 1) value = 1;
        if (value > stock) value = stock;
        setQuantity(value.toString());
    };

    const handleOrder = async () => {
        if (!name || !quantity) {
            alert("Nama dan jumlah pesanan harus diisi.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:4000/api/transactions", {
                first_name: name,
                amount: totalPrice,
                product_id: product._id,
                quantity: parsedQuantity
            });

            const { snapToken, order_id } = response.data;

            setSnapToken(snapToken);
            setOrderId(order_id);

            if (!window.snap) {
                alert("Midtrans Snap belum siap. Coba refresh halaman.");
                return;
            }

            window.snap.pay(snapToken, {
                onSuccess: function (result) {
                    setShowSuccess(true);
                    navigate("/payment-success");
                },
                onPending: function (result) {
                    alert("Menunggu pembayaran...");
                    console.log(result);
                },
                onError: function (result) {
                    alert("Pembayaran gagal 😢");
                    console.error(result);
                },
                onClose: function () {
                    alert("Kamu menutup popup pembayaran.");
                }
            });

        } catch (error) {
            alert("Gagal membuat transaksi: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (orderId) {
            const interval = setInterval(() => checkPaymentStatus(), 4000);
            return () => clearInterval(interval);
        }
    }, [orderId]);

    const checkPaymentStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/transaction-status/${orderId}`);
            const status = response.data.status;

            if (status === 'settlement' || status === 'capture') {
                setShowSuccess(true);
                navigate("/payment-success");
            }
        } catch (error) {
            console.error("Error checking payment status:", error);
        }
    };

    return (
        <>
            <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50 p-4">
                <div className="relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-3xl w-full flex flex-col md:flex-row gap-6 items-center border border-yellow-500">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-black hover:text-red-500 transition"
                    >
                        <X size={24} />
                    </button>

                    <div className="w-full md:w-1/3 flex justify-center">
                        <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="w-36 h-36 sm:w-48 sm:h-48 rounded-lg object-cover shadow-md"
                        />
                    </div>

                    <div className="flex-1 text-center md:text-left w-full space-y-3 text-black">
                        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-600">{product.name}</h2>
                        <p className="text-yellow-700 font-bold text-lg sm:text-xl">Harga: Rp {unitPrice.toLocaleString("id-ID")}</p>
                        <p className="text-gray-700 text-sm">Stok tersedia: {stock}</p>

                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Nama Pemesan"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
                            />
                            <input
                                type="text"
                                value={quantity}
                                onChange={handleQuantityChange}
                                onBlur={handleQuantityBlur}
                                placeholder="Jumlah Pesanan"
                                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
                            />
                        </div>

                        <p className="mt-2 text-base sm:text-lg font-semibold text-yellow-700">
                            Total Harga: Rp {totalPrice.toLocaleString("id-ID")}
                        </p>

                        <button
                            onClick={handleOrder}
                            disabled={loading}
                            className="mt-4 w-full bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition text-sm sm:text-base disabled:opacity-50"
                        >
                            {loading ? "Memproses..." : "Pesan Sekarang"}
                        </button>
                    </div>
                </div>
            </div>

            {showSuccess && (
                <PaymentSuccess
                    onClose={() => {
                        setShowSuccess(false);
                        navigate("/products");
                    }}
                />
            )}
        </>
    );
}

export default ProductDetail;
