import { Link } from 'react-router-dom';
import '../styles/Match.css';

function Match({ title, time, matchUrl }) {

    return (
        <div className='card'>
            <img src='#' alt=''></img>
            <div className='card-body'>
                <div className="info">
                    <Link to={matchUrl} className='item'><h4 className='card-title'>{title}</h4></Link>
                    <p>{time} 12/20</p>
                </div>
                <span>8/10p</span>
                <div className="btn-group">
                    <button>Join Game</button>
                    <Link to={matchUrl} className='item'><button>Details</button></Link>
                    
                </div>
            </div>
        </div>
    );
}

export default Match;
