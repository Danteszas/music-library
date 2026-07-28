import { useState } from "react";

import "./App.css";

import AlbumCard from "./components/AlbumCard";

import albums from "./data/albums";


function App() {


  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
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
    text: searchText
  };

  const commands = searchText.match(/\w+:[^ ]+/g);

  if (commands) {

    commands.forEach(command => {

      const [key, value] = command.split(":");

      if (key in filters) {

        filters[key] = value.toLowerCase();

        filters.text = filters.text.replace(command, "").trim();

      }

    });

  }

  if (filters.rating && album.rating !== Number(filters.rating))
    return false;

  if (filters.year && String(album.year) !== filters.year)
    return false;

  if (filters.country &&
      album.country.toLowerCase() !== filters.country)
    return false;

  if (filters.artist &&
      album.artist.toLowerCase() !== filters.artist)
    return false;

  if (
    filters.genre &&
    !(album.genres || []).some(g =>
      g.toLowerCase().includes(filters.genre)
    )
  )
    return false;

  return albumData.includes(filters.text);

});



      const randomAlbums = [...filteredAlbums].sort(() => Math.random() - 0.5);

    
      const totalAlbums = albums.length;

      const totalArtists = new Set(
        albums.map(album => album.artist)
      ).size;

      const totalCountries = new Set(
        albums.map(album => album.country)
      ).size;


      const totalGenres = new Set(
      albums.flatMap(album => album.genres)
      ).size;



  return (

    <div className="app">


      <header>


        <h1>Danteszas' Music Collection Database</h1>


        <p>A travel throught years </p>


        <p className="stats">
        {totalAlbums} Albums · {totalArtists} Artists · {totalGenres} Genres · {totalCountries} Countries
        </p>


        
        <input

          type="text"

          placeholder="🔍 Search the collection..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

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


export default App;