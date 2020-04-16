import {gql} from 'apollo-boost';

const getGlobalLatestData = gql`
    {
        GlobalLatestData {
            confirmed,
            recovered,
            deaths,
            active,
            lastUpdated
        }
    }
`
export { getGlobalLatestData }