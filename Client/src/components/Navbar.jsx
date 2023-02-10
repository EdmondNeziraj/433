import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import '../styles/Navbar.css';

function Navbar() {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleClick = () => {
        logout();
        navigate(`/`)
    }

    return (
        <div className='navbar'>
            <div className='nav-items'>
                <Link to='/' className='logo'>4-3-3</Link>
                <div className="nav-actions">
                    <Link to='/matches' className='item'>Matches</Link>
                    <Link to='/host' className='item'>Host a match</Link>
                </div>
            </div>
            <nav>
                {user && (
                    <div>
                        <span className='email'>{user.username ? user.username : user.email}</span>
                        <Link to='/' onClick={handleClick}>Log out</Link>
                    </div>
                )}

                {!user && (
                    <div>
                        <Link to='/login'>Log in</Link>
                        <Link to='/signup'>Sign up</Link>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default Navbar;
