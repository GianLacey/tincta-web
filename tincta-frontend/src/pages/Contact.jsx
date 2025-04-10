import React from 'react';

const Contacto = () => {
    return (
        <div className="contacto-container">
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
    );
};

export default Contacto;