import { createContext, useReducer } from "react";

export const MatchContext = createContext();

export const matchReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PLAYERS':
            return {
                players: action.payload
            } 
        case 'JOIN_MATCH':
            return {
                players: [...state.players, action.payload]
            }
        case 'LEAVE_MATCH':
            return {
                players: state.players.filter((player) => player._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const MatchContextProvider = ({ children }) => {
    const [matchState, matchDispatch] = useReducer(matchReducer, {
        players: []
    });

    return (
        <MatchContext.Provider value={{ ...matchState, matchDispatch }}>
            {children}
        </MatchContext.Provider>
    )
}

// export const MatchContextProvider = ({ children }) => {
//     const [players, setPlayers] = useState([]);

//     const joinMatch = (player) => {
//         setPlayers([...players, player]);
//     };

//     const leaveMatch = (playerId) => {
//         setPlayers(players.filter((player) => player._id !== playerId));
//     };

//     return (
//         <MatchContext.Provider value={{ players, joinMatch, leaveMatch }}>
//             {children}
//         </MatchContext.Provider>
//     )
// }
