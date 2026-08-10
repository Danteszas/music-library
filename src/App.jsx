import { useState } from "react";

import "./App.css";

import AlbumCard from "./components/AlbumCard";

import albums from "./data/albums";


function App() {

  const [search, setSearch] = useState("");

  const [favorites, setFavorites] = useState([]);


  // =========================
  // FILTROS Y BÚSQUEDA
  // =========================

  const filteredAlbums = albums.filter(album => {

    const albumData = [

      album.title,

      album.artist,

      album.year,

      album.country,

      ...(album.genres || [])

    ]
      .join(" ")
      .toLowerCase();


    const searchText = search.toLowerCase().trim();


    const filters = {

      rating: null,

      year: null,

      country: null,

      genre: null,

      artist: null,

      color: null,

      text: searchText

    };


    // Detectamos comandos como:
    // rating:5
    // artist:enigma
    // color:blue

    const commands = searchText.match(/\w+:[^ ]+/g);


    if (commands) {

      commands.forEach(command => {

        const [key, value] = command.split(":");


        if (key in filters) {

          filters[key] = value.toLowerCase();

          filters.text =
            filters.text
              .replace(command, "")
              .trim();

        }

      });

    }


    // =========================
    // RATING
    // =========================

    if (
      filters.rating &&
      album.rating !== Number(filters.rating)
    ) {

      return false;

    }


    // =========================
    // YEAR
    // =========================

    if (
      filters.year &&
      String(album.year) !== filters.year
    ) {

      return false;

    }


    // =========================
    // COUNTRY
    // =========================

    if (
      filters.country &&
      album.country.toLowerCase() !== filters.country
    ) {

      return false;

    }


    // =========================
    // ARTIST
    // =========================

    if (
      filters.artist &&
      album.artist.toLowerCase() !== filters.artist
    ) {

      return false;

    }


    // =========================
    // GENRE
    // =========================

    if (
      filters.genre &&
      !(album.genres || []).some(g =>
        g.toLowerCase().includes(filters.genre)
      )
    ) {

      return false;

    }


    // =========================
    // COLOR
    // =========================

    if (
      filters.color &&
      !(album.colors || []).some(color =>
        color.toLowerCase() === filters.color
      )
    ) {

      return false;

    }


    // =========================
    // TEXTO NORMAL
    // =========================

    return albumData.includes(filters.text);

  });


  // =========================
  // ORDEN ALEATORIO
  // =========================

  const randomAlbums = [
    ...filteredAlbums
  ].sort(() => Math.random() - 0.5);


  // =========================
  // ESTADÍSTICAS
  // =========================

  const totalAlbums = albums.length;


  const totalArtists = new Set(
    albums.map(album => album.artist)
  ).size;


  const totalCountries = new Set(
    albums.map(album => album.country)
  ).size;


  const totalGenres = new Set(
    albums.flatMap(album => album.genres || [])
  ).size;


  // =========================
  // INTERFAZ
  // =========================

  return (

    <div className="app">


      <header>

        <h1>
          Danteszas' Music Collection Database
        </h1>


        <p>
          A travel throught years
        </p>


        <p className="stats">

          {totalAlbums} Albums ·{" "}

          {totalArtists} Artists ·{" "}

          {totalGenres} Genres ·{" "}

          {totalCountries} Countries

        </p>


        <input

          type="text"

          placeholder="🔍 Search the collection..."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

        />

      </header>


      <main className="grid">


        {randomAlbums.map(album => (

          <AlbumCard

            key={album.id}

            album={album}

            favorites={favorites}

            setFavorites={setFavorites}

          />

        ))}


      </main>


    </div>

  );

}


// IMPORTANTE
// Esto es lo que faltaba en tu archivo.

export default App;