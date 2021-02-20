import { Link } from 'react-router-dom';
import './styles.css';

const PokemonCard = (props) => {
  const { pokemon, setPokemonList } = props;

  const handleRemove = (id) => {
    setPokemonList((prevPokemonList) => prevPokemonList.filter((pokemon) => pokemon.id !== id));
  };

  return (
    <div className='pokemon-card'>
      <button className='remove' onClick={() => handleRemove(pokemon.id)}>
        -
      </button>
      <div className='pokemon-text'>
        <p>#{pokemon.id}</p>
        <p className='pokemon-name'>
          <b>{pokemon.name}</b>
        </p>
      </div>
      <div>
        <img src={pokemon?.sprites?.front_default} alt={pokemon.name} className='pokemon-img' />
      </div>
      <Link to={`/pokemon/${pokemon.id}`}>
        <button className='more-info'>+</button>
      </Link>
    </div>
  );
};

export default PokemonCard;
