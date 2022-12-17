import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Match from "../components/Match";
import { useMatchesContext } from "../hooks/useMatchesContext";

function Hostpage() {
    const { dispatch } = useMatchesContext();

    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState(null);
    let navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const match = { location, time }

        const response = await fetch('http://localhost:5000/matches', {
            method: 'POST',
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
            navigate(`/matches/${json._id}`);
            console.log('new match added', json);
            dispatch({type: 'CREATE_MATCH', payload: json});
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
                    <button>Submit!</button>
                    {error && <div className="error">{error}</div>}
                </form>

            </header >
        </div >
    );
}

export default Hostpage;
