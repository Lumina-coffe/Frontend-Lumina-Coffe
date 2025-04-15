import React, { useState, useEffect } from "react";
import { useCart } from "../components/CartContext";
import axios from "axios";

function Checkout() {
    const { cart } = useCart();
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [firstName, setFirstName] = useState("");

    const totalAmount = cart.reduce((acc, item) => {
        const cleanPrice = parseInt(item.price.replace(/[^0-9]/g, ""), 10);
        return acc + cleanPrice;
    }, 0);

    useEffect(() => {
        const savedName = localStorage.getItem("payment");
        if (savedName) setFirstName(savedName);
    }, []);

    const handlePayment = async () => {
        if (cart.length === 0) return;

        try {
            localStorage.setItem("payment", firstName);

            // Kirim data ke backend
            const response = await axios.post("https://backend-lumina-coffe.vercel.app/api/transactions", {
                first_name: firstName,
                items: cart,
                amount: totalAmount,
            });

            const snapToken = response.data.snap_token;

            // Panggil Midtrans Snap
            window.snap.pay(snapToken, {
                onSuccess: function (result) {
                    console.log("Sukses:", result);
                    setOrderSuccess(true);
                },
                onPending: function (result) {
                    console.log("Pending:", result);
                    alert("Pembayaran masih pending. Silakan selesaikan di halaman pembayaran.");
                },
                onError: function (result) {
                    console.error("Error:", result);
                    alert("Pembayaran gagal.");
                },
                onClose: function () {
                    alert("Kamu menutup popup sebelum menyelesaikan pembayaran.");
                },
            });
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            alert("Gagal membuat transaksi.");
        }
    };

    if (cart.length === 0) {
        return <h1 className="text-center text-red-500">Keranjang kosong~</h1>;
    }

    return (
        <div className="text-center p-8">
            <h1 className="text-3xl font-bold text-blue-600">Checkout</h1>

            {orderSuccess ? (
                <p className="text-green-600 mt-4">Pembayaran berhasil! 🎉</p>
            ) : (
                <>
                    <ul className="mt-4">
                        {cart.map((item) => (
                            <li key={item.id} className="text-gray-700">
                                {item.name} - {item.price}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4">
                        <label className="block text-gray-700">Nama Pemesan:</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-1 p-2 border rounded w-full max-w-sm mx-auto"
                            placeholder="Masukkan nama kamu"
                        />
                    </div>

                    <p className="mt-4 font-semibold text-lg">
                        Total: Rp {totalAmount.toLocaleString("id-ID")}
                    </p>

                    <button
                        onClick={handlePayment}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Bayar Sekarang
                    </button>
                </>
            )}
        </div>
    );
}

export default Checkout;
