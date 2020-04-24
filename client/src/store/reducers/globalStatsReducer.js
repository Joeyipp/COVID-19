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
            let { cases, 
                  deaths, 
                  recovered, 
                  updated } = action.globalStats;
                  
            return {
                ...state,
                cases,
                deaths,
                recovered,
                active: cases - deaths - recovered,
                updated
            }
            
        default:
            return state;
    }
}

export default globalStatsReducer;