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
                <ul>
                    {matches && matches.map((match) => (
                        <MatchCard
                            key={match._id} 
                            match={match} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Matches;
