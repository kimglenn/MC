import { useState, useEffect } from "react";
import md5 from "md5";
import "../styles/Search.scss";
import Characters from "./Characters";
import Comics from "./Comics";

export default function Search() {
  const [characterData, setCharacterData] = useState(null);
  const [comicData, setComicData] = useState(null);
  const [characterName, setCharacterName] = useState("");
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
  const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;

  useEffect(() => {
    console.log("useEffect triggered"); // 이 로그가 출력되는지 확인
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log("Loaded favorites from local storage:", savedFavorites); // 로그 추가
    setFavoriteCharacters(savedFavorites);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    getCharacterData();
  };

  const getCharacterData = () => {
    setCharacterData(null);
    setComicData(null);

    const timeStamp = new Date().getTime();
    const hash = generateHash(timeStamp);

    const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${characterName}&limit=100`;


    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setCharacterData(result.data);
      })
      .catch(() => {
        console.log("error while getting character data");
      });
  };


  const handleChange = (event) => {
    setCharacterName(event.target.value);
  };

  const handleFavoriteClick = (characterId) => {
    getComicData(characterId);
  };

  const getComicData = (characterId) => {
    const timeStamp = new Date().getTime();
    const hash = generateHash(timeStamp);

    const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setComicData(result.data);
      })
      .catch(() => {
        console.log("error while getting comic data");
      });
  };

  const generateHash = (timeStamp) => {
    return md5(timeStamp + privateKey + publicKey);
  };

  const handleReset = () => {
    setCharacterName("");
    setCharacterData(null);
    setComicData(null);
  
  };

  const addToFavorites = (character) => {
    console.log("Character added to favorites:", character); // 추가된 로그
    if (favoriteCharacters.some(char => char.id === character.id)) {
      console.log("Already in favorites:", character.name);
      return; // 이미 즐겨찾기에 있으면 추가하지 않음
    }
    console.log("Adding to favorites:", character); // 추가된 로그
    setFavoriteCharacters((prev) => {
      const updatedFavorites = [...prev, character];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      console.log("Updated favorites:", updatedFavorites); // 업데이트된 리스
      return updatedFavorites;
    });
  };

  const isFavorite = (characterId) => {
    return favoriteCharacters.some(char => char.id === characterId);
  };

  console.log("Favorite Characters:", favoriteCharacters);

  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter character name"
          onChange={handleChange}
          value={characterName}
        />
        <div className="buttons">
          <button type="submit">Get Character Data</button>
          <button type="reset" className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          {!comicData && characterData && characterData.results && characterData.results.length > 0 && (
            <Characters 
              data={characterData.results} 
              onClick={(id) => getComicData(id)} 
              addToFavorites={addToFavorites} 
              isFavorite={isFavorite} 
            />
          )}

          {comicData && comicData.results && comicData.results.length > 0 && (
            <Comics data={comicData.results} onClick={() => {}} />
          )}
        </div>

        <div className="favorites" style={{ width: '100px', marginLeft: '10px' }}>
        <h2>Favorite Characters ({favoriteCharacters.length}) </h2>
        {favoriteCharacters.length > 0 ? (
          favoriteCharacters.map((char) => (
            <div key={char.id} className="favorite-item">
              <span onClick={() => handleFavoriteClick(char.id)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                {char.name}
              </span>
            </div>
          ))
        ) : (
          <p>No favorite characters found.</p>
        )}
      </div>
     
    </div>

  </>
);
}
