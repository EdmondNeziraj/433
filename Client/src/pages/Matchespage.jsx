import React, { useState, useEffect } from "react";
import Match from "../components/Match";

function Matchespage() {
    const [matches, setMatches] = useState([{}]);

    useEffect(() => {
        fetch("/matches")
            .then((response) => response.json())
            .then((responseJson) => {
                setMatches(responseJson)
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>This is going to be the Matchespage</h1>
                <div>
                    Locations of soccer fields:
                    <ul>
                        {matches.map((match) => (
                            // <li><a href={"/matches/" + match._id}>{match.location}</a></li>
                            <Match
                                title={match.location}
                                time={match.time}
                                matchUrl={"/matches/" + match._id} />
                        ))}
                    </ul>
                </div>
            </header>
        </div>
    );
}

export default Matchespage;
