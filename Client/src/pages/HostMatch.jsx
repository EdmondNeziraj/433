import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMatchesContext } from "../hooks/useMatchesContext";

function HostMatch() {
    const { dispatch } = useMatchesContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [maxPlayers, setMaxPlayers] = useState('')
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in!');
            return 
        }

        const host = user.userId;
        console.log(host);
        console.log(user.token);

        const match = { 
            title, 
            maxPlayers, 
            time, 
            date, 
            duration, 
            address, 
            city,
            state,
            zip,
            host
        }

        const response = await fetch('http://localhost:5000/matches', {
            method: 'POST',
            body: JSON.stringify(match),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('');
            setMaxPlayers(null);
            setTime('');
            setDuration(null);
            setError(null);
            navigate(`/matches/${json._id}`);
            console.log('new match added', json);
            dispatch({ type: 'CREATE_MATCH', payload: json });
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <form onSubmit={handleSubmit}>
                    <h3>Host a Match</h3>
                    <label>Title: </label>
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />

                    <label>Maximum Players: </label>
                    <input
                        type='number'
                        onChange={(e) => setMaxPlayers(e.target.value)}
                        value={maxPlayers}
                    />

                    <label>Time: </label>
                    <input
                        type='time'
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                    />

                    <label>Duration: </label>
                    <input
                        type='number'
                        onChange={(e) => setDuration(e.target.value)}
                        value={duration}
                    />
                    <label>Date: </label>
                    <input
                        type='date'
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                    />
                    <label>Address: </label>
                    <input
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                    />

                    <label>City: </label>
                    <input
                        type='text'
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                    />

                    <label>State: </label>
                    <input
                        type='text'
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                    />
                    <label>ZIP Code: </label>
                    <input
                        type='number'
                        onChange={(e) => setZip(e.target.value)}
                        value={zip}
                    />

                    <button>Host Match</button>
                    <button>Cancel</button>
                    {error && <div className="error">{error}</div>}
                </form>

            </header >
        </div >
    );
}

export default HostMatch;
