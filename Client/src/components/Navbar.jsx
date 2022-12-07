import '../styles/Navbar.css';

function Navbar() {
    return (
        <div className='navbar'>
            <a href="#" className='logo'>4-3-3</a>
            <div className='nav-items'>
                <a href="/home" className='item'>Home</a>
                <a href="/matches" className='item'>Matches</a>
                <a href="/host" className='item'>Host a Match</a>
            </div>
        </div>
    );
}

export default Navbar;
