import { colours, stats } from '../../utils';

import './styles.css';

const StatsChart = ({ pokemonChosen }) => {
  return (
    <div className='PokemonProfile_stats'>
      <h3>Base Stats</h3>
      {pokemonChosen.stats.map(({ base_stat, stat: { name } }, index) => {
        return (
          <div key={index}>
            <p>
              {name}:<span className='PokemonProfile_statBarNumber'> {base_stat}</span>
            </p>
            <div className='PokemonProfile_statBar'>
              <p>0</p>
              <div className='PokemonProfile_statBarContainer'>
                <div
                  className='PokemonProfile_statBarFill'
                  style={{
                    width: (base_stat * 100) / stats[name] + '%',
                    background: colours[pokemonChosen.types[0].type.name] + ')' || '#f1eed9',
                  }}
                ></div>
              </div>
              <p>{stats[name]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsChart;
