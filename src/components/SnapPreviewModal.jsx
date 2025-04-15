// src/components/SnapPreviewModal.jsx
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function SnapPreviewModal({ isOpen, onClose, orderId, total, onProceed }) {
    const [timeLeft, setTimeLeft] = useState(86400); // 24 jam

    useEffect(() => {
        if (!isOpen) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen]);

    const formatTime = (sec) => {
        const h = String(Math.floor(sec / 3600)).padStart(2, "0");
        const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
        const s = String(sec % 60).padStart(2, "0");
        return `${h}:${m}:${s}`;
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="bg-white p-6 rounded-xl shadow-xl max-w-lg mx-auto mt-32 relative">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 text-xl">&times;</button>
            <h2 className="text-blue-900 font-bold text-lg">Aneka Dimsum</h2>
            <h1 className="text-2xl font-bold mt-2">Rp{total.toLocaleString("id-ID")}</h1>
            <p className="text-gray-500 text-sm mt-1">Order ID #{orderId}</p>
            <p className="text-gray-600 mt-2">Choose within <span className="font-mono">{formatTime(timeLeft)}</span></p>

            <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-1">Recommended payment method</h3>
                <div className="bg-gray-100 p-3 rounded-lg">
                    <p>GoPay / QRIS</p>
                </div>

                <h3 className="mt-4 font-semibold text-gray-700 mb-1">All payment methods</h3>
                <div className="space-y-2">
                    <div className="bg-gray-100 p-3 rounded-lg">Virtual Account (BCA, BNI, Mandiri, dll)</div>
                    <div className="bg-gray-100 p-3 rounded-lg">Credit / Debit Card</div>
                    <div className="bg-gray-100 p-3 rounded-lg">Google Pay</div>
                </div>
            </div>

            <button
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                onClick={onProceed}
            >
                Lanjut ke Pembayaran
            </button>
        </Modal>
    );
}

export default SnapPreviewModal;
