import './styles.css';

const PokemonCard = (props) => {
  const { pokemon } = props;

  if(pokemon.id) {
    return (
      <div className='pokemon-card'>
      <div className='pokemon-text'>
        <p className='pokemon-name'>
          <b>{pokemon.name}</b>
        </p>
        <p>{pokemon.id}</p>
      </div>
      <div className='pokemon-img'>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
    </div>
    )
  }
  return null;
};

export default PokemonCard;
