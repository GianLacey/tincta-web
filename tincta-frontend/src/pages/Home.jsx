import { useState } from "react";
import { artworks } from "../data/artworks";
import ArtworkCard from "../components/ArtworkCard";

const Home = () => {
    const [selectedArt, setSelectedArt] = useState(null);

    return (
        <div className="home">
            {selectedArt ? (

                <div className="expanded-view">
                    <button onClick={() => setSelectedArt(null)}>✕</button>
                    <div className="expanded-art">
                        <img src={selectedArt.image} alt={selectedArt.title} />
                    </div>
                    <div className="art-details">
                        <h2>{selectedArt.title}</h2>
                        <p><strong>Artista:</strong> {selectedArt.artist}</p>
                        <p><strong>Dimensiones:</strong> {selectedArt.size}</p>
                        <p><strong>Valor:</strong> $$$</p>
                        <p><strong>Reseña:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem perspiciatis odio tempore, voluptas facere obcaecati nobis sequi dignissimos ab optio maxime adipisci quae amet accusamus error cum velit pariatur odit?</p>
                        
                    </div>
                </div>
            ) : (
                <div className="gallery">
                    {artworks.map((art) => (
                        <ArtworkCard key={art.id} {...art} onSelect={() => setSelectedArt(art)} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;