import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <div className='navbar'>
            <Link to='/home' className='logo'>4-3-3</Link>
            <div className='nav-items'>
                <Link to='/home' className='item'>Home</Link>
                <Link to='/matches' className='item'>Matches</Link>
                <Link to='/host' className='item'>Host a Match</Link>
            </div>
        </div>
    );
}

export default Navbar;
