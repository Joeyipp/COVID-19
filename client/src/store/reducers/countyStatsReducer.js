const initState = {
    header: "",
    province: "",
    county: "",
    last_updated: "",
    coordinates: { 
        latitude: "",
        longitude: "",
    },
    cases: "",
    deaths: "",
    recovered: "",
    active: ""
}

const countyStatsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_COUNTY_STATS':
            const { countyStats } = action;
            return {
                ...state,
                header: countyStats.header,
                province: countyStats.province,
                county: countyStats.county,
                last_updated: countyStats.last_updated,
                coordinates: {
                    latitude: countyStats.coordinates.latitude,
                    longitude: countyStats.coordinates.longitude
                },
                cases: countyStats.cases,
                deaths: countyStats.deaths,
                recovered: countyStats.recovered,
                active: countyStats.active
            }
            
        default:
            return state;
    }
}

export default countyStatsReducer;