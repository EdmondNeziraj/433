import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Weather from "../components/Weather";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMatchesContext } from "../hooks/useMatchesContext";

import '../styles/MatchDetail.css'

function MatchDetail() {
    const { id } = useParams();
    const { dispatch } = useMatchesContext();
    const { user } = useAuthContext();
    const [match, setMatch] = useState(null);
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    // const match = matches && matches.filter((match) => match._id === id)[0];

    useEffect(() => {
        const fetchMatch = async () => {
            const response = await fetch(`http://localhost:5000/matches/${id}`)
            const json = await response.json();

            if (response.ok) {
                setMatch(json)
            }
        }

        fetchMatch();
    }, match);

    console.log(match);
    console.log(user);


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
                            {match && (<p> {match.title}</p>)}
                            {match && match.host && (<p> Hosted by: {match.host.email}</p>)}
                            {match && (<p>{match.date}</p>)}
                            {match && (<p>{match.time}</p>)}
                            {match && (<p>{match.durationn}</p>)}
                            {match && (<p>{match.currentPlayers}/{match && match.maxPlayers}</p>)}
                            {match && (<p>{match.address}, {match && match.city}, {match && match.state} {match && match.zip}</p>)}
                        </div>
                        <div className="weather-info">
                            <Weather date={match && match.date} zip={match && match.zip} />
                        </div>
                    </div>
                    <button >Join</button>
                    <div className="btn-group">
                        {user && match && (user.email === match.host.email) && (
                            <div>
                                <button onClick={handleUpdate}>Update</button>
                                <button onClick={handleDelete}>Delete</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="left-side">
                    Players:
                    <p>Player 1</p>
                    <p>Player 2</p>
                </div>
            </div>
        </div>
    );
}

export default MatchDetail;
