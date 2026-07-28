function AlbumCard({ album, favorites, setFavorites }) {

const isFavorite = favorites.includes(album.id);

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

          style={{
            backgroundImage:`url(${album.cover})`
          }}

          

        >


          <div className="overlay">


            <h3>
              {album.title}
            </h3>


            <p>
              {album.artist}
            </p>


            {album.year && (
              <p>
                {album.year}
              </p>
            )}


            {album.genres && (
              <p>
                {album.genres.join(" • ")}
              </p>
            )}


            <span>
              {"★".repeat(album.rating)}
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