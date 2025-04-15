import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import coffeeCup from "../../assets/resource/CangkirCoffe.png";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role === "Admin") {
            setIsAdmin(true);
        }
    }, []);

    const handleLogoClick = () => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 700);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    const navLinkClass = ({ isActive }) =>
        `block px-6 py-3 md:py-0 transition duration-300 ${isActive
            ? "text-yellow-400 font-semibold"
            : "text-white hover:text-yellow-400"
        }`;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsAdmin(false);
        navigate("/");
    };

    return (
        <nav className="bg-[#2B1D14] text-white py-4 shadow-md fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
                <NavLink to="/" onClick={handleLogoClick} className="flex items-center space-x-3">
                    <img
                        src={coffeeCup}
                        alt="Lumina Coffee"
                        className={`h-12 w-auto transform transition-all duration-700 ease-in-out ${isAnimating ? "rotate-[20deg] scale-110" : "rotate-0"
                            }`}
                    />
                    <span className="text-xl sm:text-2xl font-semibold tracking-wide">Lumina Coffee</span>
                </NavLink>

                {/* Mobile toggle */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Desktop menu */}
                <ul className="hidden md:flex md:space-x-8 text-base font-medium">
                    <li><NavLink to="/" end className={navLinkClass}>HOME</NavLink></li>
                    <li><NavLink to="/products" end className={navLinkClass}>PRODUCT</NavLink></li>
                    <li><NavLink to="/contact" end className={navLinkClass}>CONTACT</NavLink></li>
                    <li><NavLink to="/about" end className={navLinkClass}>ABOUT</NavLink></li>
                    {isAdmin && (
                        <>
                            <li><NavLink to="/admin/dashboard" end className={navLinkClass}>ADMIN</NavLink></li>
                            <li><button onClick={handleLogout} className="text-white hover:text-yellow-400 px-6 py-3">LOGOUT</button></li>
                        </>
                    )}
                </ul>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden transition-[max-height] ease-in-out duration-500 overflow-hidden ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="flex flex-col bg-[#2B1D14] text-base font-medium space-y-2 py-2 px-4">
                    <li><NavLink to="/" end onClick={handleLinkClick} className={navLinkClass}>HOME</NavLink></li>
                    <li><NavLink to="/products" end onClick={handleLinkClick} className={navLinkClass}>PRODUCT</NavLink></li>
                    <li><NavLink to="/contact" end onClick={handleLinkClick} className={navLinkClass}>CONTACT</NavLink></li>
                    <li><NavLink to="/about" end onClick={handleLinkClick} className={navLinkClass}>ABOUT</NavLink></li>
                    {isAdmin && (
                        <>
                            <li><NavLink to="/admin/dashboard" end onClick={handleLinkClick} className={navLinkClass}>ADMIN</NavLink></li>
                            <li><button onClick={handleLogout} className="text-white hover:text-yellow-400 px-6 py-3 text-left">LOGOUT</button></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
