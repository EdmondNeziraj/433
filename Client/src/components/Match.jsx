import '../styles/Match.css';

function Match() {
    return (
        <div className='card'>
            <img src='#'></img>
            <div className='card-body'>
                <div className="info">
                    <h4 className='card-title'> Title </h4>
                    <p>Time and Date</p>
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
