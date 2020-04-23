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
            const { stateStats } = action;
            return {
                ...state,
                header: stateStats.state.toUpperCase(),
                state_code: stateStats.state_code,
                cases: stateStats.cases,
                grade: stateStats.grade,
                negative: stateStats.negative,
                recovered: stateStats.recovered,
                deaths: stateStats.deaths,
                active: stateStats.active,
                hospitalized: stateStats.hospitalized,
                totalTestResults: stateStats.totalTestResults,
                dateChecked: stateStats.dateChecked,
            }
            
        default:
            return state;
    }
}

export default stateStatsReducer;