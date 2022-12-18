import React from "react";
import MatchCard from "../components/MatchCard";

function Matches({matches}) {
    return (
        <div className="App">
            <header className="App-header">
                <div>
                    Locations of soccer fields:
                    <ul>
                        {matches && matches.map((match) => (
                            <MatchCard
                                key={match._id}
                                // title={match.location}
                                // time={match.time}
                                // matchUrl={"/matches/" + match._id} 
                                match={match}/>
                        ))}
                    </ul>
                </div>
            </header>
        </div>
    );
}

export default Matches;
