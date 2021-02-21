import { Link } from 'react-router-dom';
import { colours } from '../../utils';
import './styles.css';
import pokeball from '../../static/pokeball.png';

const PokemonCard = (props) => {
  const { pokemon, setPokemonList } = props;

  const handleRemove = (id) => {
    setPokemonList((prevPokemonList) => prevPokemonList.filter((pokemon) => pokemon.id !== id));
  };

  return (
    <div
      className='pokemon-card'
      style={{ background: colours[pokemon.types[0].type.name] + ', 0.2)' || '#rgb(241, 238, 217, 0.2)' }}
    >
      <div>
        <img
          src={pokemon?.sprites?.front_default || pokeball}
          alt={pokemon.name}
          className='pokemon-img'
          style={{opacity: pokemon.id.length > 3 ? 0.6 : 1}}
        />
      </div>
      <div>
        <div className='pokemon-text'>
          <p className='pokemon-id'>#{pokemon.id}</p>
          <p className='pokemon-name'>
            <b>{pokemon.name}</b>
          </p>
        </div>
        <button className='remove' onClick={() => handleRemove(pokemon.id)}>
          -
        </button>
        <Link to={`/pokemon/${pokemon.id}`}>
          <button className='more-info'>+</button>
        </Link>
      </div>
    </div>
  );
};

export default PokemonCard;
