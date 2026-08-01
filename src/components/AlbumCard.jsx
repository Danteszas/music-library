import { useRef, useState } from "react";

function AlbumCard({ album, favorites, setFavorites }) {

  const audioRef = useRef(null);
  const hoverTimeout = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const isFavorite = favorites.includes(album.id);

  const handleMouseEnter = () => {

    hoverTimeout.current = setTimeout(() => {

      if (!audioRef.current || !album.id) return;

      audioRef.current.currentTime = 0;

      audioRef.current.play().catch(() => {});

      setIsPlaying(true);

    }, 400);

  };

  const handleMouseLeave = () => {

    clearTimeout(hoverTimeout.current);

    if (!audioRef.current) return;

    audioRef.current.pause();

    audioRef.current.currentTime = 0;

    setIsPlaying(false);

  };

  function toggleFavorite(e) {

    e.preventDefault();

    if (isFavorite) {

      setFavorites(
        favorites.filter(id => id !== album.id)
      );

    } else {

      setFavorites([
        ...favorites,
        album.id
      ]);

    }

  }

  return (

    <div className="album-card">

      <a
        href={album.link}
        target="_blank"
        rel="noopener noreferrer"
      >

        <div
          className="cover"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            //backgroundImage: `url(${album.cover})`
              backgroundImage: `url(/covers/${album.id}.jpg)`
          }}
        >

          {/* Audio invisible */}
          <audio
            ref={audioRef}
            src={`/audio/${album.id}.mp3`} 
            onEnded={() => setIsPlaying(false)}
          />

          <div className="overlay">

            <h3>{album.title}</h3>

            <p>{album.artist}</p>

            {album.year && (
              <p>{album.year}</p>
            )}

            {album.genres && (
              <p>{album.genres.join(" • ")}</p>
            )}

            <span>
              {isPlaying
                ? "♫ Preview"
                : "★".repeat(album.rating)}
            </span>

            <button
              className="favorite-btn"
              onClick={toggleFavorite}
            >
              {isFavorite ? "🔖" : "📑"}
            </button>

          </div>

        </div>

      </a>

    </div>

  );

}

export default AlbumCard;