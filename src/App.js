import { useState } from 'react';

import './App.css';

import PokemonCard from './components/PokemonCard';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

function App() {
  const [inputText, setInputText] = useState('');
  const [pokemonList, setPokemonList] = useState([]);

  const getPokemon = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      const data = await res.json();
      const pokemonDuplicated = pokemonList.filter((pokemon) => pokemon.id === data.id).length !== 0; 
      // console.log(pokemonDuplicated)
      if(!pokemonDuplicated) {
        setPokemonList((prevPokemonList) => [...prevPokemonList, data])
        setInputText('')
      } else {
        alert('Pokemon already in list')
      }
    } catch (err) {
      alert('Incorrect pokemon name or ID');
      console.error(err);
    }
  };

  const handleInputTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.charCode === 13 && event.target.value) {
      handleGetPokemon();
    }
  };

  const handleGetPokemon = () => {
    if(inputText){
      getPokemon(inputText);
    }
  };

  return (
    <div className='App'>
      <div className='input'>
        <input
          type='text'
          value={inputText}
          placeholder='Type a pokemon name or ID'
          onChange={handleInputTextChange}
          onKeyPress={handleEnterKeyPress}
          size='30'
        />
      </div>
      <div className='pokemon'>
        {!pokemonList.length
          ? 'NO POKEMON WITH THAT NAME OR ID'
          : pokemonList.map((pokemon) => {
              return <PokemonCard pokemon={pokemon} key={pokemon.id} />;
            })}
      </div>
    </div>
  );
}

export default App;
