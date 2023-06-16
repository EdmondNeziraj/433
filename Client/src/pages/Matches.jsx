import React, {useState} from "react";
import Navbar from "../components/Navbar";
import MatchCard from "../components/MatchCard";
import '../styles/Matches.css'

function Matches({ matches }) {
    const [currentPage, setCurrentPage] = useState(1);
    const matchesPerPage = 6;

    const lastMatch = currentPage * matchesPerPage;
    const firstMatch = lastMatch - matchesPerPage;
    let currentMatches;
    if (matches) {
        currentMatches = matches.slice(firstMatch, lastMatch);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className="matches-container">
            <Navbar />
            <div className="matches-main">
                <h2>All matches:</h2>
                <div className="row match-card-container">
                    {currentMatches && currentMatches.map((match, index) => (
                        <div className="col-lg-4 col-sm-6" key={index}>
                            <MatchCard match={match} />
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    {/* Render pagination controls */}
                    {Array.from({ length: Math.ceil(matches.length / matchesPerPage) }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? "active" : ""}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Matches;
