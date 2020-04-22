import {gql} from 'apollo-boost';

const getGlobalLatestData = gql`
    {
        GlobalLatestData {
            cases,
            deaths,
            recovered,
            updated
        }
    }
`

const getCountriesLatestData = gql`
    {
        CountriesLatestData {
            country,
            cases,
            todayCases,
            deaths,
            todayDeaths,
            recovered,
            active,
            critical
        }
    }
`

const getStatesLatestData = gql`
    {
        StatesLatestData {
        province
        county
        coordinates {
            latitude
            longitude
        }
        latest {
            confirmed
            deaths
            recovered
        }
        }
    }
`

export { getGlobalLatestData, getCountriesLatestData, getStatesLatestData }