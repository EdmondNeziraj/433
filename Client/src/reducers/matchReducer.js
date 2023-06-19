const initialState = {
    players: []
};

const matchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PLAYERS':
            return {
                ...state,
                players: action.payload
            };

        case 'JOIN_MATCH':
            return {
                ...state,
                players: [...state.players, action.payload]
            }
        
        case 'LEAVE_MATCH':
            return {
                ...state,
                players: state.players.filter(player => player._id !== action.payload)
            };
        
        default:
            return state;
    }
};

export default matchReducer;