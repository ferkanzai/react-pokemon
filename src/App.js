import { useState } from 'react';
import './App.css';
import PokemonCard from './PokemonCard'

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'

function App() {
  const [inputText, setInputText] = useState('');
  const [pokemon, setPokemon] = useState(null);

  const getPokemon = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`)
      const data = await res.json()
      setPokemon(data)
    } catch (err) {
      setPokemon(null)
      console.error(err)
    }
  };

  const handleInputTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.charCode === 13 && event.target.value) {
      handleGetPokemon();
    }
  };

  const handleGetPokemon = () => {
    getPokemon(inputText)
    setInputText('')
  };

  return (
    <div className="App">
      <div className="input">
        <input
          type='text'
          value={inputText}
          placeholder='Type a pokemon name'
          onChange={handleInputTextChange}
          onKeyPress={handleKeyPress}
        />
        <button className="button" onClick={handleGetPokemon}>GET POKEMON</button>
      </div>
      <div className="pokemon">{ pokemon ? <PokemonCard pokemon={pokemon} /> : 'NO POKEMON WITH THAT NAME OR ID'}</div>
    </div>
  );
}

export default App;
