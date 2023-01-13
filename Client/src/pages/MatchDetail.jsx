import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Weather from "../components/Weather";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMatchesContext } from "../hooks/useMatchesContext";
import Navbar from '../components/Navbar';
import '../styles/MatchDetail.css';

function MatchDetail({ matches }) {
    const { id } = useParams();
    const { dispatch } = useMatchesContext();
    const { user } = useAuthContext();
    const [error, setError] = useState(null);
    const [isJoined, setIsJoined] = useState(false);
    let navigate = useNavigate();

    const match = matches && matches.filter((match) => match._id === id)[0];

    useEffect(() => {
        if (user && match) {
            for (let i = 0; i < match.players.length; i++) {
                if (user.email === match.players[i].email) {
                    setIsJoined(true);
                }
            }
        }
    })

    const handleUpdate = async (e) => {
        e.preventDefault();
        navigate(`/matches/${id}/edit`)
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in!');
            return
        }

        // send the delete request to the server
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
            setError(null);
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
            // increment the currentPlayers count
            matchToUpdate.currentPlayers = match.currentPlayers + 1;

            // add the player in the players array
            matchToUpdate.players = [...match.players, user.userId];
        }

        // send the patch request to the server
        const response = await fetch(`http://localhost:5000/matches/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(matchToUpdate),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError(null);
            setIsJoined(true)
            navigate(`/matches/${json._id}`);
            console.log('match updated', matchToUpdate);
            dispatch({ type: 'UPDATE_MATCH', payload: matchToUpdate })
        }
    }

    const handleLeave = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in!');
            return
        }

        const matchToUpdate = match;

        if (match) {
            console.log(match.currentPlayers, user.userId);

            // find the index of the player to remove in the array
            let index;
            for (let i = 0; i < match.players.length; i++) {
                if (match.players[i]._id === user.userId) {
                    index = i;
                }
            }

            // remove players from the array
            if (index > -1) {
                match.players.splice(index, 1);
            }

            // update the currentPlayers count
            matchToUpdate.currentPlayers = match.currentPlayers - 1;
        }

        // send the patch request to teh server
        const response = await fetch(`http://localhost:5000/matches/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(matchToUpdate),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError(null);
            setIsJoined(false)
            navigate(`/matches/${json._id}`);
            console.log('match updated', matchToUpdate);
            dispatch({ type: 'UPDATE_MATCH', payload: matchToUpdate })
        }
    }

    return (
        <div className="MD-container">
            <Navbar />
            <div className="row m-4">
                <div className="col-8">
                    {/* <img src="../assets/images" /> */}
                    <div className="row">
                        <div className="col-7">
                            {/* <div className="card mb-4"> */}
                                {/* <div className="card-body"> */}
                                    {match && (<h5> {match.title}</h5>)}
                                    {match && match.host && (<p className="text-muted"> Hosted by: {match.host.email}</p>)}
                                    {match && (<p>Date: {match.date}</p>)}
                                    {match && (<p>Time: {match.time}</p>)}
                                    {match && (<p>Duration: {match.duration} mins</p>)}
                                    {match && (<p>Players: {match.currentPlayers}/{match && match.maxPlayers}</p>)}
                                    {match && (<p>Address: {match.address}, {match && match.city}, {match && match.state} {match && match.zip}</p>)}
                                    {!user && <button><a href="/login">Log in to join match</a></button>}
                                    {user && match && (user.email !== match.host.email) && isJoined && <button onClick={handleLeave}>Leave</button>}
                                    {user && match && (user.email !== match.host.email) && !isJoined && <button onClick={handleJoin}>Join</button>}
                                    <div className="btn-group">
                                        {user && match && (user.email === match.host.email) && (
                                            <div>
                                                <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                                                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                {/* </div> */}
                            {/* </div> */}
                        </div>
                        <div className="col-5">
                            {/* <div className='card mb-4'> */}
                                {/* <div className=" card-body weather-info"> */}
                                    <Weather date={match && match.date} zip={match && match.zip} />
                                {/* </div> */}
                            {/* </div> */}
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card mb-4">
                        <div className='card-body'>
                            <h5 className="card-title">Players:</h5>

                            {match && match.players && match.players.map((player) => {
                                return <p key={player._id}>{player.username ? player.username : player.email}</p>
                            })}

                        </div>
                    </div>
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