import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import { useMatchesContext } from "../hooks/useMatchesContext";
import { useMatchContext } from '../hooks/useMatchContext';
import Navbar from '../components/Navbar';
import Weather from "../components/Weather";
import '../styles/MatchDetail.css';

function MatchDetail({ matches }) {
    const { id } = useParams();
    const { dispatch } = useMatchesContext();
    const { user } = useAuthContext();
    const [error, setError] = useState(null);
    const [isJoined, setIsJoined] = useState(false);
    const [matchFull, setMatchFull] = useState(false);
    let navigate = useNavigate();
    const { players, matchDispatch } = useMatchContext();

    const match = matches && matches.filter((match) => match._id === id)[0];

    useEffect(() => {
        if (match) {
            matchDispatch({ type: 'SET_PLAYERS', payload: match.players })
        }

        if (user && match) {
            for (let i = 0; i < match.players.length; i++) {
                if (user.username === match.players[i].username) {
                    setIsJoined(true);
                }
                if (match.players.length >= match.maxPlayers) {
                    setMatchFull(true);
                }
            }
        }
    }, [user, match, matchDispatch])

    const handleUpdate = async (e) => {
        e.preventDefault();
        navigate(`/matches/${id}/edit`)
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in!');
            return;
        }

        // send the delete request to the server
        const response = await fetch(`http://localhost:5000/api/matches/${id}`, {
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
            setError(null);
            navigate('/matches');
            dispatch({ type: 'DELETE_MATCH', payload: json })
        }
    }

    const handleJoin = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in!');
            return
        }

        if (isJoined) {
            setError('You are already joined in this match!');
            return;
        }

        if (match) {
            // add the player in the players array
            match.players.push(user.userId)

            // increment the currentPlayers count
            match.currentPlayers += 1;

            if (match.currentPlayers === match.maxPlayers) {
                setMatchFull(true)
            }
        }

        // send the patch request to the server
        const response = await fetch(`http://localhost:5000/api/matches/${id}`, {
            method: 'PATCH',
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
            setError(null);
            setIsJoined(true)
            navigate(`/matches/${json._id}`);
            dispatch({ type: 'UPDATE_MATCH', payload: match });
            matchDispatch({ type: 'JOIN_MATCH', payload: user });
            console.log('players after joinMatch: ', players);
        }
    }

    const handleLeave = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in!');
            return
        }

        if (!isJoined) {
            setError('You are already left this match!');
            return;
        }

        if (match) {
            if (match) {
                const index = match.players.findIndex(player => player._id === user.userId);

                if (index > -1) {
                    match.players.splice(index, 1);
                    match.currentPlayers -= 1;
                }
            }

        }

        // send the patch request to teh server
        const response = await fetch(`http://localhost:5000/api/matches/${id}`, {
            method: 'PATCH',
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
            setError(null);
            setIsJoined(false)
            navigate(`/matches/${json._id}`);
            dispatch({ type: 'UPDATE_MATCH', payload: match })
            matchDispatch({ type: 'LEAVE_MATCH', payload: user });
            console.log('players after leaveMatch: ', players);
        }
    }

    return (
        <div className="MD-container">
            <Navbar />
            <div className="row m-4">
                <div className="col-10 offset-1">
                    <div className="row">
                        {error && (<div>{error}</div>)}
                        <div className="col-8">
                            <div className="row match-details">
                                <div className="col-7 match-info">
                                    {match && (<h4> {match.title}</h4>)}
                                    {match && match.host && (<p className="text-muted"> Hosted by: {match.host.username}</p>)}
                                    {match && (<p><img className='icon' src={require('../assets/icons/calendar.svg').default} alt='calendar' /> {match.date} at {match.time}</p>)}
                                    {match && (<p><img className='icon' src={require('../assets/icons/clock.svg').default} alt='clock' /> {match.duration} mins</p>)}
                                    {match && (<p><img className='icon' src={require('../assets/icons/user.svg').default} alt='user' /> {match.currentPlayers}/{match.maxPlayers}</p>)}
                                    {match && (<p><img className='icon' src={require('../assets/icons/address.svg').default} alt='address' />  {match.address}, {match.city}, {match.state} {match.zip}</p>)}
                                    {!user && <button className="details-btn" ><a href="/login">Log in to join match</a></button>}
                                    {user && match && (user.username !== match.host.username) && isJoined && <button className="details-btn" onClick={handleLeave}>Leave</button>}
                                    {user && match && (user.username !== match.host.username) && !isJoined && <button disabled={matchFull} className="details-btn disabled" onClick={handleJoin}>Join</button>}
                                    {match && matchFull && (<p className='match-full'>Match is full</p>)}
                                    {user && match && (user.username === match.host.username) && (
                                        <div className="edit-btns">
                                            <button className="edit-btn update-btn" onClick={handleUpdate}>Update</button>
                                            <button className="edit-btn delete-btn" onClick={handleDelete}>Delete</button>
                                        </div>
                                    )}
                                </div>
                                <div className="col-5 players-container">
                                    <h5 className="card-title mb-2">Players</h5>
                                    <div className="players-items">
                                        {players.map((player, index) => {
                                            return <p key={index}>{player.username ? player.username : player.email}</p>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="row additional-details">
                                <h5>Additional Details</h5>
                                <p>Please arrive at least 10 minutes before the match start time.</p>
                                <p>This field is turf so you can wear whatever shoes you want,
                                    but if you wear cleats, please no metal studs. Shin guards are optional.
                                </p>
                                <p>The entrance of the park is on the corner of middletown road and stadium avenue.
                                    There is a parking lot inside the park, however, sometimes it is full and you might
                                    have to park in the streets outside of the parking lot.
                                </p>
                            </div>

                        </div>
                        <div className="col-4">
                            <Weather date={match && match.date} zip={match && match.zip} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MatchDetail;