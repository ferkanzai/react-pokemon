import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useState, useEffect } from 'react';
import './styles.css';

import { BASE_URL, rnd } from '../../utils';

const TYPE_URL = `${BASE_URL}type`;

const pokemonDuplicated = (arr, { name, id }) =>
  arr.filter((pokemon) => pokemon.name === name || pokemon.id === id).length !== 0;

const getAllTypes = async () => {
  const res = await fetch(`${TYPE_URL}`);
  const data = await res.json();
  return data.results.map(({ name }) => name);
};

const handleErrors = {
  required: 'select-error',
  validate: 'select-error',
  min: 'select-error'
};

const formatPokemon = (pokemon) => ({
  name: pokemon.name,
  id: pokemon.id,
  sprites: {
    front_default: pokemon.img,
  },
  types: [
    {
      type: {
        name: pokemon.typeOne,
      }
    },
    {
      type: {
        name: pokemon.typeTwo,
      }
    }
  ],
  stats: [
    {
      base_stat: rnd(255),
      stat: {
        name: 'hp'
      }
    },
    {
      base_stat: rnd(190),
      stat: {
        name: 'attack'
      }
    },
    {
      base_stat: rnd(250),
      stat: {
        name: 'defense'
      }
    },
    {
      base_stat: rnd(194),
      stat: {
        name: 'special-attack'
      }
    },
    {
      base_stat: rnd(250),
      stat: {
        name: 'special-defense'
      }
    },
    {
      base_stat: rnd(200),
      stat: {
        name: 'speed'
      }
    },
  ]
});

const Create = ({ pokemonList, setPokemonList }) => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const get = async () => setPokemonTypes(await getAllTypes());
    get();
  }, []);

  const handleFirstInputChange = () => setSelected(document.getElementById('typeOne').value);

  const handleSubmitForm = (data) => {
    if (!pokemonDuplicated(pokemonList, data)) {
      setPokemonList((prevPokemonList) => [...prevPokemonList, formatPokemon(data)]);
      history.push('/');
    } else {
      alert('Pokemon name or ID already exists');
    }
  };

  return (
    <>
      <h2>Create a new pokemon</h2>
      <form onSubmit={handleSubmit(handleSubmitForm)} className='create'>
        <div className='input-divs'>
          <label htmlFor='name'>Pokemon Name</label>
          <input
            name='name'
            id='name'
            type='text'
            ref={register({ required: true })}
            placeholder='Pokemon Name'
            className={`select-type ${handleErrors[errors?.name?.type]}`}
          />
        </div>
        <div className='input-divs'>
          <label htmlFor='id'>Pokemon ID</label>
          <input
            name='id'
            id='id'
            type='number'
            ref={register({ required: true, min: 899 })}
            placeholder='Pokemon ID'
            className={`select-type ${handleErrors[errors?.id?.type]}`}
            min='899'
          />
        </div>
        <div className='input-divs'>
          <label htmlFor='img'>Image URL</label>
          <input
            name='img'
            id='img'
            type='text'
            ref={register({ required: true })}
            placeholder='Image URL'
            className={`select-type ${handleErrors[errors?.img?.type]}`}
          />
        </div>
        <div className='input-divs'>
          <label htmlFor='typeOne'>Pokemon's First Type</label>
          <select
            name='typeOne'
            id='typeOne'
            ref={register({ validate: (value) => pokemonTypes.includes(value) })}
            className={`select-type ${handleErrors[errors?.typeOne?.type]}`}
            onChange={handleFirstInputChange}
            required
          >
            <option>Select first type</option>
            {pokemonTypes.map((type, index) => (
              <option key={index}>{type}</option>
            ))}
          </select>
        </div>
        <div className='input-divs'>
          <label htmlFor='typeTwo'>Pokemon's Second Type</label>
          <select
            name='typeTwo'
            id='typeTwo'
            ref={register({ validate: (value) => pokemonTypes.includes(value) })}
            className={`select-type ${handleErrors[errors?.typeTwo?.type]}`}
            required
          >
            <option>Select second type</option>
            {pokemonTypes
              .filter((type) => type !== selected)
              .map((type, index) => (
                <option key={index}>{type}</option>
              ))}
          </select>
        </div>
        <div className='submit-div'>
          <input type='submit' value='CREATE' className='submit' />
          <div className='submit-step'></div>
        </div>
      </form>
    </>
  );
};

export default Create;
