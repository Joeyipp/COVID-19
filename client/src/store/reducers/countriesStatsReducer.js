const initState = {
    // {
    //     country: "",
    //     cases: "",
    //     todayCases: "",
    //     deaths: "",
    //     todayDeaths: "",
    //     recovered: "",
    //     active: "",
    //     critical: ""
    // }
    countries: []
}

const countriesStatsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_COUNTRIES_STATS':
            return {
                ...state,
                countries: action.countriesStats
            }
        default:
            return state;
    }
}

export default countriesStatsReducer;