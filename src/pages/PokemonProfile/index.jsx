import { useParams } from 'react-router-dom';

import './styles.css';

const stats = {
  hp: 255,
  attack: 190,
  defense: 250,
  'special-attack': 194,
  'special-defense': 250,
  speed: 200,
};

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
      <div className='PokemonProfile_stats'>
        <h3>Base Stats</h3>
        {pokemonChosen.stats.map(({ base_stat, stat: { name } }, index) => {
          return (
            <>
              <p key={index}>
                {name}:<span className='PokemonProfile_statBarNumber'> {base_stat}</span>
              </p>
              <div className='PokemonProfile_statBar'>
                <p>0</p>
                <div className='PokemonProfile_statBarContainer'>
                  <div
                    className='PokemonProfile_statBarFill'
                    style={{ width: (base_stat * 100) / stats[name] + '%' }}
                  ></div>
                </div>
                <p>{stats[name]}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonProfile;

// weight hectograms 40 = 4kg
// height decimeters 3 = 30cm
