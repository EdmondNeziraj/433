import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import '../styles/Navbar.css';
import { useState } from 'react';

function Navbar() {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [collapse, setCollapse] = useState("collapse");

    const toggleNavbar = () => {
        setCollapse(prevCollapse => (prevCollapse === "collapse" ? "" : "collapse"));
    }

    const handleLogout = () => {
        logout();
        navigate(`/`)
    }

    return (
        <div>
            <nav className='navbar sticky-top navbar-expand-md'>
                <div className='container-fluid'>
                    <Link to='/' className='logo navbar-brand'>
                        4-3-3
                    </Link>
                    <button 
                        onClick={toggleNavbar} 
                        className="navbar-toggler navbar-dark" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`${collapse} navbar-collapse`} id="navbarNavAltMarkup">
                        <ul className='navbar-nav nav-items'>
                            <li className='nav-item'>
                                <Link to='/matches' className='item nav-link'>Matches</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/host' className='item nav-link'>Host a match</Link>
                            </li>
                        </ul>
                        <div className='navbar-nav'>
                            {user ? (
                                <div className='nav-logs navbar-nav'>
                                    <span className='email'>
                                        {user.username ? user.username : user.email}
                                    </span>
                                    <Link to='/' className='nav-link' onClick={handleLogout}>Log out</Link>
                                </div> 
                            ):(
                                <div className='nav-logs navbar-nav'>
                                    <Link className='nav-link' to='/login'>Log in</Link>
                                    <Link className='nav-link' to='/signup'>Sign up</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div >
    );
}

export default Navbar;
