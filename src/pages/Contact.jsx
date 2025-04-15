import React, { useRef } from "react";
import { sendEmail } from "../../utils/EmailService";// Pastikan path-nya sesuai struktur project-mu

function Contact() {
    const form = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            from_name: form.current.from_name.value,
            email: form.current.email.value,
            phone: form.current.phone.value,
            message: form.current.message.value
        };

        sendEmail(formData)
            .then(() => {
                alert("Pesan berhasil dikirim! ✨");
                form.current.reset();
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Gagal mengirim pesan 😢 Coba lagi ya, Futaro-kun.");
            });
    };

    return (
        <div className="min-h-screen bg-[#2D1E15] text-white flex items-center justify-center px-4 py-12">
            <div className="bg-[#D1D1D1] text-black w-full max-w-5xl p-8 rounded-3xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Kata-kata sambutan */}
                <div className="space-y-6 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-center md:text-left">Contact Lumina Coffee</h1>
                    <p className="text-lg leading-relaxed">
                        Terima kasih telah mengunjungi Lumina Coffee ☕️<br />
                        Jika kamu memiliki pertanyaan, saran, atau sekadar ingin menyapa, jangan ragu untuk mengirimkan pesan melalui formulir di samping ini.
                    </p>
                    <p className="text-lg leading-relaxed">
                        Kami sangat senang mendengar dari kamu dan akan berusaha merespons secepat mungkin 💬
                    </p>
                </div>

                {/* Formulir Kontak */}
                <div>
                    <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="from_name"
                            placeholder="Your Name"
                            className="w-full p-3 bg-[#3A241D] text-white rounded-md placeholder-gray-300"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="w-full p-3 bg-[#3A241D] text-white rounded-md placeholder-gray-300"
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Telephone Number"
                            className="w-full p-3 bg-[#3A241D] text-white rounded-md placeholder-gray-300"
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            className="w-full p-3 bg-[#3A241D] text-white rounded-md h-32 placeholder-gray-300"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-[#3A241D] text-white px-6 py-2 rounded-md w-full font-bold hover:bg-[#2D1E15] transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
