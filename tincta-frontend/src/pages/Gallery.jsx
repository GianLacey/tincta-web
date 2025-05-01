import { useState, useRef, useEffect } from "react";
import { artworks } from "../data/artworks";

export default function Gallery() {
    // Estado que controla cuál obra está actualmente enfocada en el centro
    const [currentIndex, setCurrentIndex] = useState(0);

    // Estado para manejar la obra seleccionada al abrir el modal
    const [selectedArtwork, setSelectedArtwork] = useState(null);

    // Imagen principal a mostrar dentro del modal
    const [mainImage, setMainImage] = useState(null);

    // Referencia al contenedor de la galería para manipular scroll y dimensiones
    const galleryRef = useRef(null);

    //Artwork centrado
    const [centeredArtwork, setCenteredArtwork] = useState(null);


    // Evento que maneja el scroll horizontal con el mouse (ruedita)
    const handleWheel = (e) => {
        if (!galleryRef.current) return;
        e.preventDefault(); // Evita el scroll vertical por defecto

        const gallery = galleryRef.current;
        const artworksElements = gallery.querySelectorAll(".artwork");
        const totalItems = artworksElements.length;

        let newIndex = currentIndex;

        // Determina si estamos haciendo scroll hacia adelante o hacia atrás
        if (e.deltaY > 0 && currentIndex < totalItems - 1) {
            newIndex = currentIndex + 1;
        } else if (e.deltaY < 0 && currentIndex > 0) {
            newIndex = currentIndex - 1;
        }

        setCurrentIndex(newIndex); // Actualiza el índice actual

        // Calcula la posición para centrar la nueva obra seleccionada
        const targetEl = artworksElements[newIndex];
        if (targetEl) {
            const scrollTo = targetEl.offsetLeft - (gallery.offsetWidth / 2 - targetEl.offsetWidth / 2);

            gallery.scrollTo({
                left: scrollTo,
                behavior: "smooth",
            });

            // Esperamos un poco para aplicar los estilos de escala y opacidad
            setTimeout(() => {
                updateArtworkStyles();
            }, 400);
        }
    };

    // Monta y desmonta el evento del scroll con la rueda del mouse
    useEffect(() => {
        const gallery = galleryRef.current;
        if (!gallery) return;

        gallery.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            gallery.removeEventListener("wheel", handleWheel);
        };

        // Esto no tiene efecto porque está después del return
        updateArtworkStyles();
    }, [currentIndex]);

    // Abre el modal de una obra y setea su imagen principal
    const openArtworkModal = (artwork) => {
        setSelectedArtwork(artwork);
        setMainImage(artwork.image);
    };

    // Muestra el contenido del modal con animación (delay mínimo)
    const [showModalContent, setShowModalContent] = useState(false);
    useEffect(() => {
        if (selectedArtwork) {
            setTimeout(() => {
                setShowModalContent(true);
            }, 10);
        } else {
            setShowModalContent(false);
        }
    }, [selectedArtwork]);

    // Controla el cierre del modal con una animación suave
    const [isClosing, setIsClosing] = useState(false);
    const handleCloseWithAnimation = () => {
        setIsClosing(true);
        setShowModalContent(false);

        setTimeout(() => {
            setSelectedArtwork(null);
            setIsClosing(false);
        }, 400);
    };

    // Aplica opacidad, escala y z-index dinámico en base a qué tan lejos está cada obra del centro de la galería

    const updateArtworkStyles = () => {
        if (!galleryRef.current) return;

        const gallery = galleryRef.current;
        const artworksElements = gallery.querySelectorAll(".artwork");
        const galleryRect = gallery.getBoundingClientRect();
        const galleryCenter = galleryRect.left + galleryRect.width / 2;

        let closestEl = null;
        let minDistance = Infinity;
        let closestIndex = -1;

        artworksElements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const elementCenter = rect.left + rect.width / 2;

            const distance = Math.abs(galleryCenter - elementCenter);

            // Escala y opacidad dinámica
            const scale = Math.max(0.8, 1 - distance / 800);
            const opacity = Math.max(0.4, 1 - distance / 600);

            el.style.transform = `scale(${scale})`;
            el.style.opacity = opacity;
            el.style.zIndex = Math.round(opacity * 100);

            // Detectar el más cercano
            if (distance < minDistance) {
                minDistance = distance;
                closestEl = el;
                closestIndex = index;
            }
        });

        if (closestIndex !== -1) {
            setCenteredArtwork(artworks[closestIndex]); // Obra que está más al centro
        }
    };

    /*const updateArtworkStyles = () => {
        if (!galleryRef.current) return;

        const gallery = galleryRef.current;
        const artworksElements = gallery.querySelectorAll(".artwork");

        const galleryRect = gallery.getBoundingClientRect();
        const galleryCenter = galleryRect.left + galleryRect.width / 2;

        artworksElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const elementCenter = rect.left + rect.width / 2;

            const distance = Math.abs(galleryCenter - elementCenter);

            // Calcula escala y opacidad en base a esa distancia
            const scale = Math.max(0.8, 1 - distance / 800);
            const opacity = Math.max(0.4, 1 - distance / 600);

            el.style.transform = `scale(${scale})`;
            el.style.opacity = opacity;
            el.style.zIndex = Math.round(opacity * 100); // mayor opacidad = más al frente
        });
    };*/

    // Llama a updateArtworkStyles cuando se scrollea o se redimensiona la ventana
    useEffect(() => {
        const gallery = galleryRef.current;
        if (!gallery) return;

        gallery.addEventListener("scroll", updateArtworkStyles);
        window.addEventListener("resize", updateArtworkStyles);

        updateArtworkStyles(); // corre al montar

        return () => {
            gallery.removeEventListener("scroll", updateArtworkStyles);
            window.removeEventListener("resize", updateArtworkStyles);
        };
    }, []);

    // Bloquea el scroll del body cuando hay un modal abierto
    useEffect(() => {
        if (selectedArtwork) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedArtwork]);


    useEffect(() => {
        if (selectedArtwork) {
            document.body.style.overflow = 'hidden'; // bloquea scroll global
        } else {
            document.body.style.overflow = 'auto'; // lo vuelve a habilitar
        }

        return () => {
            document.body.style.overflow = 'auto'; // cleanup por si se desmonta
        };
    }, [selectedArtwork]);
    // 🎨 Render de la galería
    return (
        <div>
            <div className="main-gallery">
                <div className="gallery-container" ref={galleryRef}>
                    {artworks.map((artwork, index) => (
                        <div
                            key={artwork.id}
                            className={`artwork ${centeredArtwork?.id === artwork.id ? 'show-info' : ''}`}
                        >

                            <div className="img-container">
                                <img src={artwork.image} alt={artwork.title} />
                            </div>

                            <div className="info">
                                <div className="info-detail">
                                    <p className="title">{artwork.title}</p>
                                    <p className="size">{artwork.size}</p>
                                </div>
                                <button onClick={() => openArtworkModal(artwork)}>Ver más</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Modal de detalle de la obra seleccionada */}
            {
                selectedArtwork && (
                    <div className={`modal ${isClosing ? 'closing' : ''}`}>
                        <button onClick={handleCloseWithAnimation}>Volver</button>
                        <div
                            className={`modal-content ${showModalContent ? "show" : ""}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-body">

                                <div className="main-image">
                                    <img src={mainImage} alt={selectedArtwork.title} />
                                </div>

                                <div className="thumbnails">
                                    {[selectedArtwork.image, selectedArtwork.imageA, selectedArtwork.imageB]
                                        .filter(Boolean)
                                        .map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt={`${selectedArtwork.title} ${index}`}
                                                className={`thumbnail ${mainImage === img ? "active" : ""}`}
                                                onClick={() => setMainImage(img)}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className="art-info">
                            <h2>{selectedArtwork.title}</h2>
                            <p>{selectedArtwork.artist}</p>
                            <p>{selectedArtwork.size}</p>
                            <p className="art-review">{selectedArtwork.review}</p>
                        </div>
                        <div className="contact-info">
                            <h2>CONTACTO</h2>
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
                        </div>
                    </div>
                )
            }
        </div >
    );
}
