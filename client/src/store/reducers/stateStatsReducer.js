const initState = {
    header: "",
    state_code: "",
    cases: "",
    grade: "",
    negative: "",
    recovered: "",
    deaths: "",
    active: "",
    hospitalized: "",
    totalTestResults: "",
    dateChecked: ""
}

const stateStatsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_STATE_STATS':
            const { state_code, 
                    cases,
                    grade,
                    negative,
                    recovered,
                    deaths,
                    active,
                    hospitalized,
                    totalTestResults,
                    dateChecked } = action.stateStats;
                    
            return {
                ...state,
                header: action.stateStats.state,
                state_code, 
                cases,
                grade,
                negative,
                recovered,
                deaths,
                active,
                hospitalized,
                totalTestResults,
                dateChecked
            }
            
        default:
            return state;
    }
}

export default stateStatsReducer;