import { createContext, useReducer } from "react";

export const MatchesContext = createContext();

export const matchesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MATCHES':
            return {
                matches: action.payload
            } 
        case 'CREATE_MATCH':
            return {
                matches: [...state.matches, action.payload]
            }
        case 'UPDATE_MATCH':
            const updatedMatches = state.matches.map(match => match._id === action.payload._id ? action.payload : match)
            return {
                matches: updatedMatches
            }
        case 'DELETE_MATCH':
            return {
                matches: state.matches.filter((match) => match._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const MatchesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(matchesReducer, {
        matches: null
    });

    return (
        <MatchesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </MatchesContext.Provider>
    )
}