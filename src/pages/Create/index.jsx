import { useState, useEffect } from 'react';
import './styles.css';

import { BASE_URL } from '../../utils';

const TYPE_URL = `${BASE_URL}type`;

const getPkmnTypes = async () => {
  const res = await fetch(`${TYPE_URL}`);
  const data = await res.json();
  return data.results.map(({ name }) => name);
};

const Create = () => {
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const get = async () => setPokemonTypes(await getPkmnTypes());
    get();
  }, []);

  const handleFirstInputChange = () => setSelected(document.getElementById('type').value);

  return (
    <>
      <form>
        <select name='type' id='type' className='select-type' onChange={handleFirstInputChange}>
          <option>Select first type</option>
          {pokemonTypes.map((type, index) => (
            <option key={index}>{type}</option>
          ))}
        </select>
        <select name='type' id='type' className='select-type'>
          <option>Select second type</option>
          {pokemonTypes
            .filter((type) => type !== selected)
            .map((type, index) => (
              <option key={index}>{type}</option>
            ))}
        </select>
      </form>
    </>
  );
};

export default Create;
