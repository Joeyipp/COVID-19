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
            const { header,
                    province,
                    county,
                    last_updated,
                    coordinates,
                    cases,
                    deaths,
                    recovered,
                    active } = action.countyStats;
                    
            return {
                ...state,
                header,
                province,
                county,
                last_updated,
                coordinates,
                cases,
                deaths,
                recovered,
                active
            }
            
        default:
            return state;
    }
}

export default countyStatsReducer;