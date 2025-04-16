import React from "react";
import AnimatedPage from "../components/layout/AnimatedPage";
import coffeeImage from "../assets/resource/kopi.png";
import "@fontsource/playfair-display";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Home() {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Fungsi untuk mengarahkan ke halaman produk
  const goToProducts = () => {
    navigate("/products"); // Arahkan ke halaman /products
  };
  const goToLogin = () => {
    navigate("/Login");
  };

  return (
    <AnimatedPage>
      {/* Hero Section */}
      <div className="bg-[#2D1E15] text-white min-h-screen flex items-center justify-center px-6 md:px-16 py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-10">
          {/* Teks */}
          <div className="space-y-6 text-center md:text-left">
            <p className="uppercase text-sm tracking-widest text-amber-200">
              Selamat datang di
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight font-['Playfair_Display']">
              Lumina Coffee
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Tempat di mana kopi bukan sekadar minuman, tapi cerita yang
              dituangkan dalam cangkir. Hadirkan kehangatan untuk setiap
              pertemuan, dan cita rasa yang mendalam untuk setiap momen.
            </p>
            <button
              onClick={goToProducts} // Panggil fungsi untuk mengarahkan
              className="mt-4 mr-5 bg-amber-400 text-[#2D1E15] px-6 py-2 rounded-full font-semibold text-sm hover:bg-amber-300 transition-all duration-300 shadow-lg"
            >
              Temukan Rasa Kami
            </button>{" "}
            <button
              onClick={goToLogin}
              className="mt-6 bg-amber-400 text-[#2D1E15] px-6 py-2 rounded-full font-semibold text-sm hover:bg-amber-300 transition-all duration-300 shadow-lg"
            >
              Login
            </button>
          </div>
          {/* Gambar */}
          <div className="flex justify-center md:justify-end">
            <img
              src={coffeeImage}
              alt="Cangkir Kopi"
              className="w-60 sm:w-72 md:w-96 rounded-xl shadow-2xl hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* Ornamen Latar */}
        <div className="absolute bottom-[-50px] left-[-50px] w-[200px] h-[200px] bg-white/5 rounded-full blur-2xl z-0"></div>
        <div className="absolute top-[20px] right-[-60px] w-[150px] h-[150px] bg-white/10 rounded-full blur-xl z-0"></div>
      </div>

      {/* Signature Menu */}
      <section className="bg-[#2D1E15] text-white py-16 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">Signature Menu</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              title: "Lumina Latte",
              img: "https://deltacoffee.co.id/wp-content/uploads/2023/09/Apa-itu-Latte-dan-Mengenal-Komposisi-Latte.jpg",
              desc: "Kopi susu khas Lumina dengan aroma yang memikat.",
            },
            {
              title: "Es Kopi Aren",
              img: "https://www.nescafe.com/id/sites/default/files/2023-08/Cobain%20Minuman%20Kekinian%20Ala%20Cafe%20Di%20Rumah%2C%20Yuk%21%20Ini%20Resepnya_desk.jpg",
              desc: "Racikan klasik kopi dan gula aren yang segar.",
            },
            {
              title: "Brown Sugar Cold Brew",
              img: "https://kashmirmonitor-s01.sgp1.cdn.digitaloceanspaces.com/wp-content/uploads/2018/05/CF.jpg",
              desc: "Minuman favorit dengan cita rasa karamel dan lembut.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#3c2a1d] rounded-lg shadow-md overflow-hidden hover:scale-105 transition"
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimoni */}
      <section className="bg-[#f7f3ee] text-[#2D1E15] py-16 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Apa Kata Mereka?
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              name: "Alya R.",
              comment:
                "Tempatnya cozy banget, cocok buat kerja dan ngobrol santai. Kopinya juga enak!",
            },
            {
              name: "Bimo A.",
              comment:
                "Es kopi arennya juara. Pelayanannya ramah dan suasananya adem!",
            },
            {
              name: "Citra K.",
              comment:
                "Interiornya estetik parah! Setiap sudut bisa jadi spot foto 😍",
            },
          ].map((testi, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300"
            >
              <p className="italic text-gray-700 mb-3">"{testi.comment}"</p>
              <h4 className="font-bold text-[#2D1E15]">- {testi.name}</h4>
            </div>
          ))}
        </div>
      </section>
    </AnimatedPage>
  );
}

export default Home;
