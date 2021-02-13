import { Fragment } from "react";

const PokemonCard = (props) => {
  const { pokemon } = props;

  return (
    <Fragment>
      <div className="pokemon-text">
        <p><b>{pokemon.name}</b></p>
        <p>{pokemon.id}</p>
      </div>
      <div className="pokemon-img">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
    </Fragment>
  )
}

export default PokemonCard