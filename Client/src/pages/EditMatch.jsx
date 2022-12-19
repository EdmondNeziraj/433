import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useMatchesContext } from "../hooks/useMatchesContext";
import { useAuthContext } from "../hooks/useAuthContext";

function EditMatch({ matches }) {
    const { id } = useParams();
    const match = matches && matches.filter((match) => match._id === id)[0];

    const { dispatch } = useMatchesContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState(match && match.title);
    const [maxPlayers, setMaxPlayers] = useState(match.maxPlayers)
    const [time, setTime] = useState(match.time);
    const [date, setDate] = useState(match.date);
    const [duration, setDuration] = useState(match.duration);
    const [address, setAddress] = useState(match.address);
    const [city, setCity] = useState(match.city);
    const [state, setState] = useState(match.state);
    const [zip, setZip] = useState(match.zip);
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in!');
            return
        }

        const matchUpdated = {
            title: title,
            maxPlayers: maxPlayers,
            time: time,
            date: date, 
            duration: duration,
            address: address,
            city: city,
            state: state,
            zip: zip,
            host: user.userId,
            currentPlayers: match.currentPlayers,
            players: match.players
        }

        console.log('just updated:', matchUpdated)

        const response = await fetch(`http://localhost:5000/matches/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(matchUpdated),
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
            setTime('');
            setError(null);
            navigate(`/matches/${json._id}`);
            console.log('match updated', matchUpdated);
            dispatch({ type: 'UPDATE_MATCH', payload: matchUpdated })
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <form onSubmit={handleSubmit}>
                    <h3>Edit Match</h3>
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

                    <button>Update</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </header >
        </div >
    );
}

export default EditMatch;
