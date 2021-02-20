import { Link } from 'react-router-dom';

import './styles.css';
import pokeball from '../../static/pokeball.png';

const Header = (props) => {
  return (
    <header>
      <div className='title'>
        <h1>Pokemon App</h1>
        <img src={pokeball} alt='pokeball' className='pokeball' />
      </div>
      <nav className='nav-bar'>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/create'>Create</Link></li>
          {/* <li><Link to='/profile/:name/'>Profile</Link></li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
