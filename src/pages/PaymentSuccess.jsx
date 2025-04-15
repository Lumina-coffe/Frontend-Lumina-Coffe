import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const PaymentSuccess = ({ onClose }) => {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full text-center">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold text-yellow-800 mb-3">🎉 Terima Kasih!</h2>
                <p className="text-gray-700 mb-2">
                    Kamu telah berhasil memesan di <span className="font-semibold text-yellow-700">Lumina Coffee</span>.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                    Kami sedang menyiapkan pesananmu. Nikmati harimu dengan secangkir kopi hangat ☕
                </p>

                <button
                    onClick={() => {
                        onClose?.(); // Tutup pop-up jika ada handler
                        navigate('/products'); // ✅ Arahkan ke halaman produk
                    }}
                    className="bg-yellow-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-yellow-700 transition"
                >
                    Kembali ke Produk
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
