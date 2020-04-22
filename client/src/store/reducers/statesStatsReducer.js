const initState = {
    states: []
}

const statesStatsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_STATES_STATS':
            return {
                ...state,
                states: action.statesStats
            }
        default:
            return state;
    }
}

export default statesStatsReducer;