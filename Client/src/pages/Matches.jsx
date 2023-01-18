import React from "react";
import Navbar from "../components/Navbar";
import MatchCard from "../components/MatchCard";
import '../styles/Matches.css'

function Matches({ matches }) {
    return (
        <div className="matches-container">
            <Navbar />
            <div className="matches-main">
                <h2>All matches:</h2>
                <div className="row match-card-container">
                    {matches && matches.map((match) => (
                        <div className="col-4">
                            <MatchCard
                                key={match._id}
                                match={match} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Matches;
