import '../styles/Match.css';

function Match({title, time, matchUrl}) {
    return (
        <div className='card'>
            <img src='#' alt=''></img>
            <div className='card-body'>
                <div className="info">
                    <h4 className='card-title'><a href={matchUrl}>{title}</a></h4>
                    <p>{time} 12/20</p>
                </div>
                <span>8/10p</span>
                <div className="btn-group">
                    <button>Join Game</button>
                    <button>Details</button>
                </div>
            </div>
        </div>
    );
}

export default Match;
