import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useState, useEffect } from 'react';
import './styles.css';

import { BASE_URL } from '../../utils';

const TYPE_URL = `${BASE_URL}type`;

const pokemonDuplicated = (arr, { name, id }) =>
  arr.filter((pokemon) => pokemon.name === name || pokemon.id === id).length !== 0;

const getPkmnTypes = async () => {
  const res = await fetch(`${TYPE_URL}`);
  const data = await res.json();
  return data.results.map(({ name }) => name);
};

const handleErrors = {
  required: 'select-error',
  validate: 'select-error',
};

const Create = ({ pokemonList, setPokemonList }) => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const get = async () => setPokemonTypes(await getPkmnTypes());
    get();
  }, []);

  const handleFirstInputChange = () => setSelected(document.getElementById('typeOne').value);

  const handleSubmitForm = (data) => {
    if (!pokemonDuplicated(pokemonList, data)) {
      setPokemonList((prevPokemonList) => [...prevPokemonList, data]);
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
            ref={register({ required: true })}
            placeholder='Pokemon ID'
            className={`select-type ${handleErrors[errors?.id?.type]}`}
          />
        </div>
        <div className='input-divs'>
          <label htmlFor='sprites.front_default'>Image URL</label>
          <input
            name='sprites.front_default'
            id='img'
            type='text'
            ref={register({ required: true })}
            placeholder='Image URL'
            className={`select-type ${handleErrors[errors?.sprites?.front_default?.type]}`}
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
