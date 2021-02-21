import { useParams } from 'react-router-dom';
import StatsChart from '../../components/StatsChart';

import './styles.css';

const PokemonProfile = ({ pokemonList }) => {
  const { id } = useParams();

  const pokemonChosen = pokemonList.find((pokemon) => pokemon.id === id);

  return (
    <div className='PokemonProfile'>
      <div className='PokemonProfile_div_img'>
        <img
          src={
            pokemonChosen.sprites.other
              ? pokemonChosen.sprites.other['official-artwork'].front_default
              : pokemonChosen.sprites.front_default
          }
          alt={pokemonChosen.name}
          className='PokemonProfile_img'
        />
      </div>
      <div className='PokemonProfile_info'>
        <h2>
          #{pokemonChosen.id} - <span className='PokemonProfile_name'>{pokemonChosen.name}</span>
        </h2>
        <h3 className='PokemonProfile_typeName'>Types</h3>
        <div className='PokemonProfile_types'>
          {pokemonChosen.types.map(({ type: { name } }, index) => (
            <p key={index} className='PokemonProfile_type'>
              {name}
            </p>
          ))}
        </div>
        <h3>Physical</h3>
        <p>Weight: {pokemonChosen.weight ? `${pokemonChosen.weight / 10} kg` : 'unknown'}</p>
        <p>Height: {pokemonChosen.height ? `${pokemonChosen.height * 10} cm` : 'unknown'}</p>
      </div>
      <StatsChart {...{ pokemonChosen }} />
    </div>
  );
};

export default PokemonProfile;

// weight hectograms 40 = 4kg
// height decimeters 3 = 30cm
