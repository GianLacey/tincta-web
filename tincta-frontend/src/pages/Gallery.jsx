import { useState, useRef, useEffect } from "react";
import "../styles/Gallery.css";
import { artworks } from "../data/artworks";

export default function Gallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const galleryRef = useRef(null);

    const handleWheel = (e) => {
        if (!galleryRef.current) return;
        e.preventDefault();

        const gallery = galleryRef.current;
        const artworksElements = gallery.querySelectorAll(".artwork");
        const artworkWidth = artworksElements[0]?.offsetWidth || 0;
        const gap = parseInt(getComputedStyle(gallery).gap || 0);

        const totalItems = artworks.length;

        let newIndex = currentIndex;

        if (e.deltaY > 0 && currentIndex < totalItems - 1) {
            newIndex = currentIndex + 1;
        } else if (e.deltaY < 0 && currentIndex > 0) {
            newIndex = currentIndex - 1;
        }

        setCurrentIndex(newIndex);

        const scrollTo = newIndex * (artworkWidth + gap) - (gallery.offsetWidth / 2 - artworkWidth / 2);

        gallery.scrollTo({
            left: scrollTo,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const gallery = galleryRef.current;
        if (!gallery) return;

        gallery.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            gallery.removeEventListener("wheel", handleWheel);
        };
    }, [currentIndex]);

    return (
        <div>
            <div className="gallery-container" ref={galleryRef}>
                {artworks.map((artwork, index) => (
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
                        <button onClick={() => setSelectedArtwork(null)}>✕</button>
                        <img src={selectedArtwork.image} alt={selectedArtwork.title} />
                        <div className="art-info">
                            <h2>{selectedArtwork.title}</h2>
                            <p>{selectedArtwork.artist}</p>
                            <p className="art-review">{selectedArtwork.review}</p>
                            <p>{selectedArtwork.size}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}