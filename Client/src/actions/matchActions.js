export const setPlayers = (players) => {
    return {
        type: 'SET_PLAYERS',
        payload: players
    };
};

export const joinMatch = (player) => {
    return {
        type: 'JOIN_MATCH',
        payload: player
    };
};

export const leaveMatch = (playerId) => {
    return {
        type: 'LEAVE_MATCH',
        payload: playerId
    }
}
