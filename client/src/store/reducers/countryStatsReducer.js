const initState = {
    header: "",
    country_code: "",
    country_name: "",
    geo: {
        latitude: "",
        longitude: ""
    },
    capital: "",
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
            const { header, 
                    country_code, 
                    country_name, 
                    geo, 
                    capital, 
                    cases, 
                    todayCases, 
                    deaths, 
                    todayDeaths, 
                    recovered, 
                    active, 
                    critical } = action.countryStats;

            return {
                ...state,
                header, 
                country_code, 
                country_name, 
                geo, 
                capital, 
                cases, 
                todayCases, 
                deaths, 
                todayDeaths, 
                recovered, 
                active, 
                critical
            }
            
        default:
            return state;
    }
}

export default countryStatsReducer;