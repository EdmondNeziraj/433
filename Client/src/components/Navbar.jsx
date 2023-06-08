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
        if (collapse === "collapse") {
            setCollapse("");
        } else {
            setCollapse("collapse");
        }
    }

    const handleClick = () => {
        logout();
        navigate(`/`)
    }

    return (
        <nav className='navbar sticky-top navbar-expand-lg'>
            <div className='container-fluid'>
                <Link to='/' className='logo navbar-brand'>4-3-3</Link>
                <button onClick={toggleNavbar} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div onClick={toggleNavbar} className={collapse} id="navbarNavAltMarkup">
                    <div className='nav-items'>
                        <div className="nav-actions me-auto mb-1 mb-lg-0">
                            <Link to='/matches' className='item'>Matches</Link>
                            <Link to='/host' className='item'>Host a match</Link>
                        </div>
                    </div>
                    <nav className='navbar-nav ms-auto'>
                        {user && (
                            <div className='nav-logs'>
                                <span className='email'>{user.username ? user.username : user.email}</span>
                                <Link to='/' onClick={handleClick}>Log out</Link>
                            </div>
                        )}

                        {!user && (
                            <div className='nav-logs'>
                                <Link to='/login'>Log in</Link>
                                <Link to='/signup'>Sign up</Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
