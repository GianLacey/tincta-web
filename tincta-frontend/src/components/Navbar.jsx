import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/tinctaLogo.svg";
import menuLogo from "../assets/iconos/burger-menu-svgrepo-com.svg";
import contactLogo from "../assets/iconos/contact-us.png";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const [contactOpen, setContactOpen] = useState(false);

    const toggleContact = () => {
        setContactOpen(!contactOpen);
    };

    return (
        <>
            {/* Fondo oscurecido con transición */}
            <div
                className={`overlay ${(menuOpen || contactOpen) ? "active" : ""}`}
                onClick={() => {
                    if (menuOpen) toggleMenu();
                    if (contactOpen) toggleContact();
                }}
            ></div>

            <nav className="navbar">
                <ul className="nav-left">
                    {/* <img src={searchLogo} alt="searchLogo" /> */}

                    <li><button className="contact-button" onClick={toggleContact}><p>CONTACTO</p> <img src={contactLogo} alt="contactLogo" /></button></li>
                </ul>
                <div>
                    <Link to="/"><img src={logo} alt="Logo" className="logo" /></Link>
                    <h1 className="title">GALERÍA DE ARTE</h1>
                </div>


                <ul className="nav-right">

                    <li><button className="menu-button" onClick={toggleMenu}><img src={menuLogo} alt="hamburgerLogo" /><p>MENÚ</p></button></li>
                </ul>
            </nav>

            {/*Menu Contacto*/}

            <div className={`contacto-container ${contactOpen ? "open" : ""}`}>

                <button className="close-button" onClick={toggleContact}>✕</button>
                <h1 className="contacto-heading">CONTACTO</h1>
                <div>
                    <div className="info-container">
                        <p className="info-label">Nombre:</p>
                        <p className="info-contact">Guido Bannon</p>
                    </div>
                    <div className="info-container">
                        <p className="info-label">Teléfono:</p>
                        <p className="info-contact">
                            <a href="tel:+542326501198" className="info-link">
                                (+54) 2326-501198
                            </a>
                        </p>
                    </div>
                    <div className="info-container">
                        <p className="info-label">Instagram:</p>
                        <p className="info-contact">
                            <a
                                href="https://instagram.com/tincta.arte"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="info-link"
                            >
                                @tincta.arte
                            </a>
                        </p>
                    </div>
                    <div className="info-container">
                        <p className="info-label">Sitio web:</p>
                        <p className="info-contact">
                            <a
                                href="https://www.tincta.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="info-link"
                            >
                                www.tincta.com
                            </a>
                        </p>
                    </div>
                </div>

            </div>


            {/* Menú lateral */}
            <div className={`side-menu ${menuOpen ? "open" : ""}`}>
                <button className="close-button" onClick={toggleMenu}>✕</button>
                <h2>PRÓXIMAMENTE</h2>
                <ul>
                    <li><Link to="" onClick={toggleMenu}>Sobre Nosotros</Link></li>
                    <li><Link to="" onClick={toggleMenu}>Servicios</Link></li>
                    <li><Link to="" onClick={toggleMenu}>Blog</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;