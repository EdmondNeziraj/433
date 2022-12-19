import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Weather from "../components/Weather";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMatchesContext } from "../hooks/useMatchesContext";

import '../styles/MatchDetail.css'

function MatchDetail({ matches }) {
    const { id } = useParams();
    const { dispatch } = useMatchesContext();
    const { user } = useAuthContext();
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    const match = matches && matches.filter((match) => match._id === id)[0];

    console.log(match);

    const handleUpdate = async (e) => {
        e.preventDefault();
        navigate(`/matches/${id}/edit`)
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!user) {
            return
        }

        const response = await fetch(`http://localhost:5000/matches/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            // setLocation('');
            // setTime('');
            // setError(null);
            navigate('/matches');
            console.log('match deleted', json);
            dispatch({ type: 'DELETE_MATCH', payload: json })
        }
    }

    const handleJoin = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in!');
            return
        }

        const matchToUpdate = match;

        if (match) {
            console.log(match.currentPlayers, user.userId);

            matchToUpdate.currentPlayers = match.currentPlayers + 1;
            matchToUpdate.players = [ ...match.players, user.userId];
            
            console.log(matchToUpdate)
        }

        
        const response = await fetch(`http://localhost:5000/matches/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(matchToUpdate),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        console.log('user token: ', user.token)

        const json = await response.json();

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            // setTime('');
            setError(null);
            navigate(`/matches/${json._id}`);
            console.log('match updated', matchToUpdate);
            dispatch({ type: 'UPDATE_MATCH', payload: matchToUpdate })
        }
    }

    return (
        <div className="App">
            <div className="App-header container">
                <div className=" right-side">
                    <img src="../assets/images" />
                    <div className="info">
                        <div className="match-info">
                            {match && (<p> {match.title}</p>)}
                            {match && match.host && (<p> Hosted by: {match.host.email}</p>)}
                            {match && (<p>{match.date}</p>)}
                            {match && (<p>{match.time}</p>)}
                            {match && (<p>{match.durationn}</p>)}
                            {match && (<p>{match.currentPlayers}/{match && match.maxPlayers}</p>)}
                            {match && (<p>{match.address}, {match && match.city}, {match && match.state} {match && match.zip}</p>)}
                        </div>
                        <div className="weather-info">
                            <Weather date={match && match.date} zip={match && match.zip} />
                        </div>
                    </div>
                    {user && match && (user.email !== match.host.email) && (<button onClick={handleJoin}>Join</button>)}
                    <div className="btn-group">
                        {user && match && (user.email === match.host.email) && (
                            <div>
                                <button onClick={handleUpdate}>Update</button>
                                <button onClick={handleDelete}>Delete</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="left-side">
                    Players:
                    <p>Player 1</p>
                    <p>Player 2</p>
                </div>
            </div>
        </div>
    );
}

export default MatchDetail;

// <div className="text-center">
//                     <Dropzone
//                       onDrop={(files) => {
//                         if (files.length > 0) {
//                           waitBase64(files[0]);
//                           setSelectedImage(files[0]);
//                         }
//                         files.map((file) => {
//                           setEntryData({
//                             ...entryData,
//                             file: file,
//                           });
//                         });
//                       }}
//                     >
//                       {({ getRootProps, getInputProps }) => (
//                         <div className="container">
//                           <div
//                             {...getRootProps({
//                               className: "dropzone",
//                             })}
//                           >
//                             <input {...getInputProps()} />
//                             {selectedImage ? (
//                               <img
//                                 src={URL.createObjectURL(selectedImage)}
//                                 alt="Thumb"
//                                 className="upload-icon upload-icon-edit"
//                               />
//                             ) : (
//                               <div>
//                                 <img
//                                   src="/assets/icons/upload.svg"
//                                   alt="upload"
//                                   className="upload-icon"
//                                 />
//                                 <div>
//                                   Drag 'n' drop some files here, or click to
//                                   select files
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       )}
//                     </Dropzone>
//                   </div>