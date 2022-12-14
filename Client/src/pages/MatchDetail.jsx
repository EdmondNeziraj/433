import React, { useState, useEffect } from "react";

function MatchDetail() {
    const [matches, setMatches] = useState([{}]);

    useEffect(() => {
        fetch("http://localhost:5000/matches")
            .then((response) => response.json())
            .then((responseJson) => {
                setMatches(responseJson)
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>This is going to be the MatchDetail</h1>
                <div>
                    Details of of soccer fields:
                    <p>{matches[0].location}</p>
                </div>
            </header>

        </div>
    );
}

export default MatchDetail;
