const initState = {
    counties: []
}

const countiesStatsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_COUNTIES_STATS':
            return {
                ...state,
                counties: action.countiesStats
            }
        default:
            return state;
    }
}

export default countiesStatsReducer;