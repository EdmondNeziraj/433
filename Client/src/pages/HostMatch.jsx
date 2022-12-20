import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMatchesContext } from "../hooks/useMatchesContext";
import Navbar from '../components/Navbar'


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
        const players = [user.userId];

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
            host,
            players
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
        <div className="host-container">
            <Navbar />
            <div className="row">
                <h3 className="text-center m-3">Host a Match</h3>
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
                        <button className="btn btn-primary">Host Match</button>
                        <button className="btn btn-danger">Cancel</button>
                        {error && <div className="error text-danger">{error}</div>}
                    </form>
                </div>



            </div >
        </div >
    );
}

export default HostMatch;
