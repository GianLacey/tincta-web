import { useState, useRef, useEffect } from "react";
import "../styles/Gallery.css";

import { artworks } from "../data/artworks";

export default function Gallery() {
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const galleryRef = useRef(null);

    const handleWheel = (e) => {
        if (galleryRef.current) {
            e.preventDefault();
            galleryRef.current.scrollLeft += e.deltaY;
        }
    };

    useEffect(() => {
        const gallery = galleryRef.current;
        if (!gallery) return;

        const handleInfiniteScroll = () => {
            // Si está al final del scroll, vuelve al inicio
            if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth) {
                gallery.scrollLeft = 0;
            }
            // Si está al inicio del scroll, va al final
            else if (gallery.scrollLeft <= 0) {
                gallery.scrollLeft = gallery.scrollWidth;
            }
        };

        gallery.addEventListener("wheel", handleWheel, { passive: false });

        // Evento de scroll infinito
        gallery.addEventListener("scroll", handleInfiniteScroll);

        // Limpiar eventos al desmontar
        return () => {
            gallery.removeEventListener("wheel", handleWheel);
            gallery.removeEventListener("scroll", handleInfiniteScroll);
        };
    }, []);

    return (
        <div>
            <div className="gallery-container" ref={galleryRef} onWheel={handleWheel}>
                {artworks.map((artwork) => (
                    <div
                        key={artwork.id}
                        className="artwork"
                        onClick={() => setSelectedArtwork(artwork)}
                    >
                        <img src={artwork.image} alt={artwork.title} />
                        <div className="info">
                            <p>{artwork.title}</p>
                            <p>{artwork.size}</p>
                            <button onClick={() => setSelectedArtwork(artwork)}>Ver más</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedArtwork && (
                <div className="modal" onClick={() => setSelectedArtwork(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedArtwork.image} alt={selectedArtwork.title} />
                        <h2>{selectedArtwork.title}</h2>
                        <p>{selectedArtwork.size}</p>
                        <button onClick={() => setSelectedArtwork(null)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}