import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

function MatchDetail({ matches }) {
    const { id } = useParams();
    const match = matches.filter((match) => match._id === id)[0];

    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        navigate(`/matches/${id}/edit`)
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        
        const response = await fetch(`http://localhost:5000/matches/${id}`, {
            method: 'DELETE'
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
            console.log('match deleted', json);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    Details of of soccer fields:
                    <p>{match.location}</p>
                    <p>{match.time}</p>
                </div>
                <div className="btn-group">
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </header>

        </div>
    );
}

export default MatchDetail;
