import '../styles/MatchCard.css';

function MatchCard({ match }) {

    return (
        <div className='card mb-3'>
            <div className='row'>

                <div className='col-12'> 
                    <div className="card-body">
                        <h4 className='card-title'>{match.title}</h4>
                        <p className='card-item'><img className='icon ' src={require('../assets/icons/calendar.svg').default} alt='calendar' />{match.date} at {match.time}</p>
                        <p className='card-item'><img className='icon' src={require('../assets/icons/clock.svg').default} alt='clock' />{match.duration} mins</p>
                        <p className='card-item'><img className='icon' src={require('../assets/icons/user.svg').default} alt='user' /> {match.currentPlayers}/{match && match.maxPlayers}</p>
                        <a className='card-btn' href={`/matches/${match._id}`}>Details</a>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MatchCard;
