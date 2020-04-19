const initState = {
    header: "WORLD",
    cases: "",
    deaths: "",
    recovered: "",
    active: "",
    updated: ""
}

const globalStatsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_GLOBAL_STATS':
            let { globalStats } = action;
            return {
                ...state,
                cases: globalStats.cases,
                deaths: globalStats.deaths,
                recovered: globalStats.recovered,
                active: globalStats.cases - globalStats.deaths - globalStats.recovered,
                updated: globalStats.updated
            }
            
        default:
            return state;
    }
}

export default globalStatsReducer;