import { Link } from 'react-router-dom';
import '../styles/MatchCard.css';

function MatchCard({ match }) {

    return (
        <div className='card'>
            <img src='#' alt=''></img>
            <div className='card-body'>
                <div className="info">
                    <Link to={`/matches/${match._id}`} className='item'><h4 className='card-title'>{match.title}</h4></Link>
                    <p>{match.date} at {match.time}</p>
                    <p>{match.duration} mins</p>
                </div>
                <span>{match.currentPlayers}/{match.maxPlayers}p</span>
                <Link to={`/matches/${match._id}`} className='item btn'><button>Details</button></Link>
            </div>
        </div>
    );
}

export default MatchCard;
