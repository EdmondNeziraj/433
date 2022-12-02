import '../styles/Navbar.css';

function Navbar() {
    return (
        <div className='navbar'>
            <a href="#" className='logo'>4-3-3</a>
            <div className='nav-items'>
                <a href="#" className='item'>Home</a>
                <a href="#" className='item'>Matches</a>
                <a href="#" className='item'>Host a Match</a>
            </div>
        </div>
    );
}

export default Navbar;
