const initialState = {
    matches: null
};

const matchesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_MATCHES':
            return {
                ...state,
                matches: action.payload
            };
        
        case 'CREATE_MATCH':
            return {
                ...state,
                matches: [...state.matches, action.payload]
            };

        case 'UPDATE_MATCH':
            const updatedMatches = state.matches.map(match => 
                match._id === action.payload._id ? action.payload : match
            );
            return {
                ...state,
                matches: updatedMatches
            };
     
        case 'DELETE_MATCH':
            return {
                ...state,
                matches: state.matches.filter(match => match._id !== action.payload)
            }

        default:
            return state;
    }
};

export default matchesReducer;