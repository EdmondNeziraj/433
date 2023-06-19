export const setMatches = (matches) => {
    return {
        type: 'SET_MATCHES',
        payload: matches
    };
};

export const createMatch = (match) => {
    return {
        type: 'CREATE_MATCH',
        payload: match
    };
};

export const updateMatch = (match) => {
    return {
        type: 'UPDATE_MATCH',
        payload: match
    };
};

export const deleteMatch = (matchId) => {
    return {
        type: 'DELETE_MATCH',
        payload: matchId
    };
};

