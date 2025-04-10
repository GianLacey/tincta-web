import { useState } from "react";

const ArtworkCard = ({ id, title, artist, image, size, onSelect, technic, year, review }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="artwork"

        >
            <div className="artwork-card">
                    <img className="art-img" src={image} alt={title} onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)} />

                    {/* Aquí controlamos la animación directamente con `hovered` */}
                    <button
                        className="view-button"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        onClick={() => onSelect(id)}
                        style={{
                            opacity: hovered ? 1 : 0, // Aparece cuando hovered es true
                            transform: hovered ? 'translateX(0px)' : 'translateX(20px)', // Desplazamiento hacia la derecha
                            pointerEvents: hovered ? 'auto' : 'none', // Habilitar clics solo cuando es visible
                            transition: 'opacity 0.5s ease, transform 0.5s ease', // Transición suave
                           
                        }}
                    >
                        Ver más
                    </button>
               


                <div className="art-info">
                    <h3 className="art-title">{title}</h3>
                    <p className="art-autor">{artist}</p>
                    <p>{technic}</p>
                    <p>{year}</p>
                    <p>{review}</p>
                    <p className="art-size">{size}</p>
                </div>
            </div>
        </div>
    );
};

export default ArtworkCard;