import { Link } from 'react-router-dom'
import '../styles/Footer.css';

function Footer() {
    return (
        <div className="footer">
            <Link to='/' className='footer-logo'>4-3-3</Link>
            <span className='footer-item'>&copy; 4-3-3 2022</span>
        </div>
    );
}

export default Footer;
