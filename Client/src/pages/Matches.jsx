import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import MatchCard from "../components/MatchCard";
import Pagination from "../components/Pagination";
import { useMatchesContext } from "../hooks/useMatchesContext.js";
import '../styles/Matches.css'

function Matches() {
    const { matches, dispatch } = useMatchesContext();
    const [currentPage, setCurrentPage] = useState(1);
    const matchesPerPage = 6;

    let currentMatches;
    if (matches) {
        const startIndex = (currentPage - 1) * matchesPerPage;
        currentMatches = matches.slice(startIndex, startIndex + matchesPerPage);
    }

    useEffect(() => {
        const fetchMatches = async () => {
          try {
            const response = await fetch(`https://433.edmondneziraj.com/api/matches?pageSize=${matchesPerPage}&page=1&sort=date`);
            if (response.ok) {
              const json = await response.json();
              console.log(json);
              const sortedMatches = json.sort((a, b) => {
                const timeA = new Date(a.time);
                const timeB = new Date(b.time);
                return timeA - timeB;
              });
              dispatch({ type: 'SET_MATCHES', payload: sortedMatches });
            } else {
              // Handle error response
              console.log('Error fetching matches');
            }
          } catch (error) {
            // Handle fetch error
            console.log('Error fetching matches:', error);
          }
        };
    
        fetchMatches();
      }, [dispatch]);

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
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={matches ? matches.length : 0}
                    pageSize={matchesPerPage}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}

export default Matches;
