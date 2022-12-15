import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function MatchDetail({ matches }) {
    const { id } = useParams();

    const match = matches.filter((match) => match._id === id)[0];

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    Details of of soccer fields:
                    <p>{match.location}</p>
                    <p>{match.time}</p>
                </div>
                <div className="btn-group">
                    <button>Update</button>
                    <button>Delete</button>
                </div>
            </header>

        </div>
    );
}

export default MatchDetail;
