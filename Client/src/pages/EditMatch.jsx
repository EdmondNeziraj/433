import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

function EditMatch({matches}) {
    const { id } = useParams();
    const match = matches.filter((match) => match._id === id)[0];

    const [location, setLocation] = useState(match.location);
    const [time, setTime] = useState(match.time);
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const match = { location, time }

        const response = await fetch(`http://localhost:5000/matches/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(match),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const json = await response.json();

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setLocation('');
            setTime('');
            setError(null);
            navigate('/matches');
            console.log('match updated', json);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <form onSubmit={handleSubmit}>
                    <h3>Host a Match</h3>
                    <label>Location: </label>
                    <input
                        type='text'
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                    />

                    <label>Time: </label>
                    <input
                        type='text'
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                    />
                    <button>Update</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </header >
        </div >
    );
}

export default EditMatch;
