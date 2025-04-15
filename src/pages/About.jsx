import React from "react";
import latar from "../assets/resource/latar.jpg";

function About() {
    return (
        <div className="min-h-screen bg-[#2D1E15] flex flex-col md:flex-row items-center justify-center gap-8 px-8 py-16 overflow-hidden">

            {/* Gambar Latar di Sisi Kiri */}
            <div className="w-full md:w-1/2 relative">
                <img
                    src={latar}
                    alt="Lumina Cafe"
                    className="rounded-3xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition duration-500"
                />
            </div>

            {/* Teks di Sisi Kanan */}
            <div className="w-full md:w-1/2 text-white space-y-6">
                <h1 className="text-4xl font-bold tracking-wide">Cerita Kami</h1>
                <p className="text-lg leading-relaxed text-gray-200">
                    Di balik gemerlap gedung kota, <span className="text-yellow-400 font-semibold">Lumina Cafe</span> hadir sebagai oasis cahaya.
                    Bukan sekadar tempat minum kopi, kami adalah manifestasi mimpi —
                    perpaduan rasa, kehangatan, dan tempat jiwa-jiwa bertemu.
                </p>
            </div>

        </div>
    );
}

export default About;
