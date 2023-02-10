import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMatchesContext } from "../hooks/useMatchesContext";
import Navbar from '../components/Navbar'
import '../styles/HostMatch.css'


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
    const [details, setDetails] = useState('');
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

        console.log(match);

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
            console.log(response);
            setError(json.error)
        }
        if (response.ok) {
            console.log(response);
            setTitle('');
            setMaxPlayers(null);
            setTime('');
            setDuration(null);
            setError(null);
            navigate(`/matches`);
            console.log('new match added', json);
            dispatch({ type: 'CREATE_MATCH', payload: json });
        }
    }

    const handleCancel = async (e) => {
        e.preventDefault();
        console.log('from cancel button')
        navigate(`/matches`)
    }


    return (
        <div className="host-container">
            <Navbar />
            <div className="row">
                <h3 className="text-center m-3">Host a Match</h3>
                <div className="col-4 offset-4 host-form">
                    <form>
                        <div className="form-group row mb-2">
                            <label className="col-sm-3 col-form-label col-form-label">Title</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type='text'
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label className="col-sm-3 col-form-label col-form-label">Maximum players</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type='number'
                                    onChange={(e) => setMaxPlayers(e.target.value)}
                                    value={maxPlayers}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-2">
                            <label className="col-sm-3 col-form-label col-form-label">Time</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type='time'
                                    onChange={(e) => setTime(e.target.value)}
                                    value={time}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-2">
                            <label className="col-sm-3 col-form-label col-form-label">Date</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type='date'
                                    onChange={(e) => setDate(e.target.value)}
                                    value={date}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-2">
                            <label className="col-sm-3 col-form-label col-form-label">Duration (mins)</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type='number'
                                    onChange={(e) => setDuration(e.target.value)}
                                    value={duration}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-2">
                            <label className="col-sm-3 col-form-label col-form-label">Field address</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type='text'
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-2">
                            <label className="col-sm-3 col-form-label col-form-label">City</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type='text'
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-2">
                            <label className="col-sm-3 col-form-label col-form-label">State</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type='text'
                                    onChange={(e) => setState(e.target.value)}
                                    value={state}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-2">
                            <label className="col-sm-3 col-form-label col-form-label">Zip</label>
                            <div className="col-sm-9">
                                <input
                                    className="form-control"
                                    type='number'
                                    onChange={(e) => setZip(e.target.value)}
                                    value={zip}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row mb-2">
                            <label className="col-sm-3 col-form-label col-form-label">Additional details</label>
                            <div className="col-sm-9">
                                <textarea
                                    className="form-control"
                                    type='textarea'
                                    onChange={(e) => setDetails(e.target.value)}
                                    value={details}
                                    rows={4}
                                />
                            </div>
                        </div>

                        <div className="col-sm-9 offset-3 host-btns">
                            <button className="host-btn host-match-btn" onClick={handleSubmit}>Host match</button>
                            <button className="host-btn cancel-btn" onClick={handleCancel}>Cancel</button>
                        </div>
                        {error && <div className="error text-danger">{error}</div>}
                    </form>
                </div>
            </div >
        </div >
    );
}

export default HostMatch;
