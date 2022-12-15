import React, { useState, useEffect } from "react";
import Match from "../components/Match";

function Matchespage({matches}) {
    // const [matches, setMatches] = useState([{}]);

    // useEffect(() => {
    //     fetch("http://localhost:5000/matches")
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             setMatches(responseJson)
    //         });
    // }, []);

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    Locations of soccer fields:
                    <ul>
                        {matches.map((match) => (
                            // <li><a href={"/matches/" + match._id}>{match.location}</a></li>
                            <Match
                                key={match._id}
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
