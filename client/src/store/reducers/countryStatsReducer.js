const initState = {
    header: "",
    cases: "",
    todayCases: "",
    deaths: "",
    todayDeaths: "",
    recovered: "",
    active: "",
    critical: "" 
}

const countryStatsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_COUNTRY_STATS':
            const { countryStats } = action;
            return {
                ...state,
                header: countryStats.header.toUpperCase(),
                cases: countryStats.cases,
                todayCases: countryStats.todayCases,
                deaths: countryStats.deaths,
                todayDeaths: countryStats.todayDeaths,
                recovered: countryStats.recovered,
                active: countryStats.active,
                critical: countryStats.critical
            }
            
        default:
            return state;
    }
}

export default countryStatsReducer;