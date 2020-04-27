// import {gql} from 'apollo-boost';
import gql from 'graphql-tag';

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
            state
            positive
            grade
            negative
            recovered
            death
            hospitalized
            totalTestResults
            dateChecked
        }
    }
`

const getCountiesLatestData = gql`
    {
        CountiesLatestData {
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

const getStateLatestNews = gql`
    query($q: String!) {
        StateLatestNews(q: $q) {
            source {
                name
            }
            author
            title
            description
            url
            urlToImage
            publishedAt
            content
            preview {
                images
            }
        }
    }
`

const getWorldLatestNews = gql`
    {
        WorldLatestNews {
            source {
                name
            }
            author
            title
            description
            url
            urlToImage
            publishedAt
            content
            preview {
                images
            }
        }
    }
`

const getCountryBreakingNews = gql`
    query($country: String!) {
        CountryBreakingNews(country: $country) {
            source {
                name
            }
            author
            title
            description
            url
            urlToImage
            publishedAt
            content
            preview {
                images
            }
        }
    }
`

export { getGlobalLatestData, getCountriesLatestData, getStatesLatestData, getCountiesLatestData, getStateLatestNews, getWorldLatestNews, getCountryBreakingNews }