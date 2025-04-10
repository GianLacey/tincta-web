import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/tinctaLogo.svg";
import menuLogo from "../assets/iconos/burger-menu-svgrepo-com.svg";
import searchLogo from "../assets/iconos/search-find-svgrepo-com.svg";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            {/* Fondo oscurecido con transición */}
            <div
                className={`overlay ${menuOpen ? "active" : ""}`}
                onClick={toggleMenu}
            ></div>

            <nav className="navbar">
                <ul className="nav-left">
                    {/* <img src={searchLogo} alt="searchLogo" /> */}
                    
                    <li><Link to="/contact">CONTACTO</Link></li>
                </ul>
                <div>
                    <Link to="/"><img src={logo} alt="Logo" className="logo" /></Link>
                    <h1 className="title">GALERÍA DE ARTE</h1>
                </div>


                <ul className="nav-right">

                    <li><button className="menu-button" onClick={toggleMenu}><img src={menuLogo} alt="hamburgerLogo" />MENÚ</button></li>
                </ul>
            </nav>

            {/* Menú lateral */}
            <div className={`side-menu ${menuOpen ? "open" : ""}`}>
                <button className="close-button" onClick={toggleMenu}>✕</button>
                <h2>PRÓXIMAMENTE</h2>
                <ul>
                    <li><Link to="/about" onClick={toggleMenu}>Sobre Nosotros</Link></li>
                    <li><Link to="/services" onClick={toggleMenu}>Servicios</Link></li>
                    <li><Link to="/blog" onClick={toggleMenu}>Blog</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;