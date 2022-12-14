import { useState, useEffect } from "react";
import axios from "axios";
import Match from "../components/Match";

function Hostpage() {
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    // const [matches, setMatches] = useState([{}]);

    // useEffect(() => {
    //     fetch("http://localhost:5000/matches")
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             setMatches(responseJson)
    //         });
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const match = { location, time }

        const response = await fetch('/matches', {
            method: 'POST',
            body: JSON.stringify(match),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response);
        const json = await response.json();

        if (response.ok) {
            setLocation('');
            setTime('');
            console.log('new match added', json);
        }

    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>This is going to be the hostpage</h1>
                <form onSubmit={handleSubmit}>
                    <h3>Host a Match</h3>
                    <label>Location: </label>
                    <input
                        type='text'
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                        // name={"match[location]"}
                    />

                    <label>Time: </label>
                    <input
                        type='text'
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                        // name={"match[time]"}
                    />
                    <button>Submit!</button>
                </form>
                {/* <ul>
                        {matches.map((match) => (
                            // <li><a href={"/matches/" + match._id}>{match.location}</a></li>
                            <Match
                                title={match.location}
                                time={match.time}
                                matchUrl={"/matches/" + match._id} />
                        ))}
                    </ul> */}
            </header >
        </div >
    );
}

export default Hostpage;
