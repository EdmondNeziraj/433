import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useMatchesContext } from "../hooks/useMatchesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from '../components/Navbar'

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
        <div className="edit-container">
            <Navbar />
            <div className="row">
                <h3 className="text-center m-3">Edit Match</h3>
                <div className="col-6 offset-3">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row mb-2">
                            <label className="col-sm-2 col-form-label col-form-label">Title: </label>
                            <div className="col-sm-10">
                                <input
                                    className="form-control"
                                    type='text'
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label className="col-sm-2 col-form-label col-form-label">Maximum Players: </label>
                            <div className="col-sm-10">
                                <input
                                    className="form-control"
                                    type='number'
                                    onChange={(e) => setMaxPlayers(e.target.value)}
                                    value={maxPlayers}
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-2">
                            <label className="col-sm-2 col-form-label col-form-label">Time: </label>
                            <div className="col-sm-10">
                                <input
                                    className="form-control"
                                    type='time'
                                    onChange={(e) => setTime(e.target.value)}
                                    value={time}
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-2">
                            <label className="col-sm-2 col-form-label col-form-label">Duration: </label>
                            <div className="col-sm-10">
                                <input
                                    className="form-control"
                                    type='number'
                                    onChange={(e) => setDuration(e.target.value)}
                                    value={duration}
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-2">
                            <label className="col-sm-2 col-form-label col-form-label">Date: </label>
                            <div className="col-sm-10">
                                <input
                                    className="form-control"
                                    type='date'
                                    onChange={(e) => setDate(e.target.value)}
                                    value={date}
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-2">
                            <label className="col-sm-2 col-form-label col-form-label">Address: </label>
                            <div className="col-sm-10">
                                <input
                                    className="form-control"
                                    type='text'
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-2">
                            <label className="col-sm-2 col-form-label col-form-label">City: </label>
                            <div className="col-sm-10">
                                <input
                                    className="form-control"
                                    type='text'
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-2">
                            <label className="col-sm-2 col-form-label col-form-label">State: </label>
                            <div className="col-sm-10">
                                <input
                                    className="form-control"
                                    type='text'
                                    onChange={(e) => setState(e.target.value)}
                                    value={state}
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-2">
                            <label className="col-sm-2 col-form-label col-form-label">ZIP code: </label>
                            <div className="col-sm-10">
                                <input
                                    className="form-control"
                                    type='number'
                                    onChange={(e) => setZip(e.target.value)}
                                    value={zip}
                                />
                            </div>
                        </div>

                        <button>Update</button>
                        <button className="btn btn-danger">Cancel</button>
                        {error && <div className="error text-danger">{error}</div>}
                    </form>
                </div>
            </div >
        </div >
    );
}

export default EditMatch;
