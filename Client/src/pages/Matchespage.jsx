import React, { useState, useEffect } from "react";
import Match from "../components/Match";

function Matchespage({matches}) {
    return (
        <div className="App">
            <header className="App-header">
                <div>
                    Locations of soccer fields:
                    <ul>
                        {matches && matches.map((match) => (
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
