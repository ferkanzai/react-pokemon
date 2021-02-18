import { useEffect, useState, useCallback } from 'react';

import './App.css';

import PokemonCard from './components/PokemonCard';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

function App() {
  const [inputText, setInputText] = useState('');
  const [pokemonList, setPokemonList] = useState([]);

  const getPokemon = useCallback(async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      const data = await res.json();
      const pokemonDuplicated = pokemonList.filter((pokemon) => pokemon.id === data.id).length !== 0;
      if(!pokemonDuplicated) {
        setPokemonList((prevPokemonList) => [...prevPokemonList, data])
        setInputText('')
      }
    } catch (err) {
      setInputText('')
      alert('Incorrect pokemon name or ID');
      console.error(err);
    }
  }, [pokemonList]);

  const handleInputTextChange = (event) => {
    setInputText(event.target.value)
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getPokemon(inputText)
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [inputText, getPokemon])

  return (
    <div className='App'>
      <div className='input'>
        <input
          type='text'
          value={inputText}
          placeholder='Type a pokemon name or ID'
          onChange={handleInputTextChange}
          size='30'
        />
      </div>
      <div className='pokemon'>
        {!pokemonList.length
          ? null
          : pokemonList.map((pokemon) => {
              return <PokemonCard pokemon={pokemon} key={pokemon.id} />;
            })}
      </div>
    </div>
  );
}

export default App;
