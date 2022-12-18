import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useMatchesContext } from "../hooks/useMatchesContext";

function EditMatch({matches}) {
    const { id } = useParams();
    const match = matches && matches.filter((match) => match._id === id)[0];

    const { dispatch } = useMatchesContext();

    const [title, setTitle] = useState(match.title);
    const [maxPlayers, setMaxPlayers] = useState(match.maxPlayers)
    const [time, setTime] = useState(match.time);
    const [date, setDate] = useState(match.date);
    const [duration, setDuration] = useState(match.duration);
    const [address, setAddress] = useState(match.address);
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const match = { title, maxPlayers, time, date, duration, address }

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
            setTime('');
            setError(null);
            navigate(`/matches/${json._id}`);
            console.log('match updated', json);
            dispatch({type: 'UPDATE_MATCH', payload: json})
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

                    <button>Update</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </header >
        </div >
    );
}

export default EditMatch;
