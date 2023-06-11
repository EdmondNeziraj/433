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
        if (collapse === "collapse navbar-collapse") {
            setCollapse("");
        } else {
            setCollapse("collapse navbar-collapse");
        }
    }

    const handleClick = () => {
        logout();
        navigate(`/`)
    }

    return (
        <div>
            <nav className='navbar sticky-top navbar-expand-lg'>
                <div className='container-fluid'>
                    <a href='/' className='logo navbar-brand'>4-3-3</a>
                    <button onClick={toggleNavbar} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div onClick={toggleNavbar} className={collapse} id="navbarNavAltMarkup">
                        <div className='navbar-nav nav-items'>
                                <a href='/matches' className='item nav-link'>Matches</a>
                                <a href='/host' className='item nav-link'>Host a match</a>
                        </div>
                        <div className='navbar-nav ms-auto'>
                            {user && (
                                <div className='nav-logs navbar-nav ms-auto'>
                                    <span className='email'>{user.username ? user.username : user.email}</span>
                                    <a href='/' className='nav-link' onClick={handleClick}>Log out</a>
                                </div> 
                            )}

                            {!user && (
                                <div className='nav-logs navbar-nav ms-auto'>
                                    <a className='nav-link' href='/login' to='/login'>Log in</a>
                                    <Link className='nav-link' to='/signup'>Sign up</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
{/* 

                        <div class="navbar-nav">
                            <a class="nav-link active" href="/">Home</a>
                            <a class="nav-link" href="/campgrounds">Campgrounds</a>
                            <a class="nav-link" href="/campgrounds/new">New Campground</a>
                        </div>
                        <div class="navbar-nav ms-auto">
                            <% if (!currentUser) { %>
                        <a class="nav-link" href="/login">Log In</a>
                        <a class="nav-link" href="/register">Register</a>
                        <%} else { %>
                        <a class="nav-link" href="/logout">Log Out</a>
                        <%};%>
                        </div>
                    </div>
                </div>
            </nav> */}
        </div >
    );
}

export default Navbar;
