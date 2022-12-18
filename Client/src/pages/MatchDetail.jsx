import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Weather from "../components/Weather";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMatchesContext } from "../hooks/useMatchesContext";

import '../styles/MatchDetail.css'

function MatchDetail({ matches }) {
    const { id } = useParams();
    const { dispatch } = useMatchesContext();
    const { user } = useAuthContext();

    const match = matches && matches.filter((match) => match._id === id)[0];

    // const [location, setLocation] = useState('');
    // const [time, setTime] = useState('');
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        navigate(`/matches/${id}/edit`)
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!user) {
            return
        }

        const response = await fetch(`http://localhost:5000/matches/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            // setLocation('');
            // setTime('');
            // setError(null);
            navigate('/matches');
            console.log('match deleted', json);
            dispatch({ type: 'DELETE_MATCH', payload: json })
        }
    }

    return (
        <div className="App">
            <div className="App-header container">
                <div className=" right-side">
                    <img src="../assets/images" />
                    <div className="info">
                        <div className="match-info">
                            <p>{match.title}</p>
                            <p>{match.date}</p>
                            <p>{match.time}</p>
                            <p>{match.durationn}</p>
                            <p>{match.currentPlayers}/{match.maxPlayers}</p>
                            <p>{match.address}, {match.city}, {match.state} {match.zip}</p>
                        </div>
                        <div className="weather-info">
                            <Weather date={match.date} zip={match.zip} />
                        </div>
                    </div>
                    <div className="btn-group">
                        <button >Join</button>
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
                <div className="left-side">
                    <p>Player 1</p>
                    <p>Player 2</p>
                </div>
            </div>
        </div>
    );
}

export default MatchDetail;
