import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import PokemonCard from './components/PokemonCard';
import Header from './components/Header';
import Create from './pages/Create';
import PokemonProfile from './pages/PokemonProfile';

import { BASE_URL } from './utils';

const POKEMON_URL = `${BASE_URL}pokemon`;

const pokemonDuplicated = (arr, id) =>
  arr.filter((pokemon) => pokemon.name === id || pokemon.id === id).length !== 0;

function App() {
  const [inputText, setInputText] = useState('');
  const [pokemonList, setPokemonList] = useState([]);

  const getPokemon = async (id) => {
    try {
      if (!pokemonDuplicated(pokemonList, id)) {
        const res = await fetch(`${POKEMON_URL}/${id}`);
        const data = await res.json();
        setPokemonList((prevPokemonList) => [
          ...prevPokemonList,
          { ...data, id: data.id.toString() },
        ]);
      }
    } catch (err) {
      alert('Incorrect pokemon name or ID');
      console.error(err);
    }
    setInputText('');
  };

  const handleInputTextChange = (event) => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputText && getPokemon(inputText.toLowerCase());
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [inputText]);

  return (
    <Router>
      <div className='App'>
        <Header />
        <div className='main'>
          <Switch>
            <Route path='/' exact>
              <div className='input'>
                <input
                  type='text'
                  value={inputText}
                  placeholder='Type either pokemon name or pokemon ID'
                  onChange={handleInputTextChange}
                  size='35'
                  className='type-pokemon'
                />
              </div>
              <div className='pokemon'>
                {pokemonList.map((pokemon) => {
                  return <PokemonCard {...{ pokemon, key: pokemon.id, setPokemonList }} />;
                })}
              </div>
            </Route>

            <Route path='/create' exact>
              <Create {...{pokemonList, setPokemonList}}/>
            </Route>

            <Route path='/pokemon/:id' exact>
                <PokemonProfile pokemonList={pokemonList} />
            </Route>

            {/* <Redirect to='/' /> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

// const Input = () => {}
// const value = ''
// const onChange = () => {}
// const onFocus = () => {}

// <Input {...{ value, onChange, onFocus }} />

export default App;
