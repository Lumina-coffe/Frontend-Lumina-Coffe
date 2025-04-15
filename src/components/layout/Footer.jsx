import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-[#2D1E15] text-white py-12 px-6 md:px-16">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
                {/* Tentang Kami */}
                <div>
                    <h2 className="text-xl font-bold mb-3">Lumina Coffee</h2>
                    <p className="text-gray-300 text-sm">
                        Kami hadir sebagai tempat berkumpul, berbagi cerita, dan menikmati cita rasa kopi dan makanan terbaik khas lokal.
                    </p>
                </div>

                {/* Layanan Kami */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Layanan Kami</h2>
                    <ul className="text-gray-300 text-sm space-y-2">
                        <li>Menu Makanan & Minuman</li>
                        <li>Layanan Katering</li>
                        <li>Pelayanan Profesional</li>
                        <li>Sewa Tempat Nyaman</li>
                    </ul>
                </div>

                {/* Produk Unggulan */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Produk Unggulan</h2>
                    <ul className="text-gray-300 text-sm space-y-2">
                        <li>Kopi Best Seller</li>
                        <li>Daging Wahyu Premium</li>
                        <li>Aneka Kue & Snack</li>
                    </ul>
                </div>

                {/* Media Sosial */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Ikuti Kami</h2>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <a href="https://web.facebook.com/" className="bg-white p-3 rounded-full shadow-md hover:scale-110 transition">
                            <FaFacebookF className="text-[#2D1E15] text-xl" />
                        </a>
                        <a href="https://www.instagram.com/khumaz_lavandula/" className="bg-white p-3 rounded-full shadow-md hover:scale-110 transition">
                            <FaInstagram className="text-[#2D1E15] text-xl" />
                        </a>
                    </div>
                    <p className="text-gray-400 text-xs mt-4">📍 Jl. Kopi Sejuk No. 5, Kendal</p>
                    <p className="text-gray-400 text-xs">☎ 0821-0000-1234</p>
                </div>
            </div>

            <div className="border-t border-white mt-10"></div>

            <div className="text-center text-gray-500 text-sm mt-6">
                <p>&copy; 2025 Lumina Coffee. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
