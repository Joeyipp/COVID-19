const graphql = require('graphql');
const axios = require('axios');
const _ = require('lodash');
const dotenv = require('dotenv');
const {getLinkPreview} = require('link-preview-js');

// load env vars
dotenv.config({path: './config/config.env'});

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLInt,
        GraphQLSchema,
        GraphQLList,
        GraphQLID } = graphql;

const GlobalLatestDataType = new GraphQLObjectType({
    name: "GlobalLatestData",
    fields: () => ({
        cases: { type: GraphQLInt },
        deaths: { type: GraphQLInt },
        recovered: { type: GraphQLInt },
        updated: { type: GraphQLString }
    })
})

const CountryLatestDataType = new GraphQLObjectType({
    name: "CountryLatestData", 
    fields: () => ({
        country: { type: GraphQLString },
        cases: { type: GraphQLInt },
        todayCases: { type: GraphQLInt },
        deaths: { type: GraphQLInt },
        todayDeaths: { type: GraphQLInt },
        recovered: { type: GraphQLString },
        active: { type: GraphQLString },
        critical: { type: GraphQLInt },
        casesPerOneMillion: { type: GraphQLInt },
        deathsPerOneMillion: { type: GraphQLString }
    })
})

const CoordinateType = new GraphQLObjectType({
    name: "Coordinate",
    fields: () => ({
        latitude: { type: GraphQLString },
        longitude: { type: GraphQLString }
    })
})

const LatestType = new GraphQLObjectType({
    name: "Latest",
    fields: () => ({
        confirmed: { type: GraphQLInt },
        deaths: { type: GraphQLInt },
        recovered: { type: GraphQLInt }
    })
})

const StateLatestDataType = new GraphQLObjectType({
    name: "StateLatestData",
    fields: () => ({
        state: { type: GraphQLString },
        positive: { type: GraphQLInt },
        grade: { type: GraphQLString },
        negative: { type: GraphQLInt },
        recovered: { type: GraphQLInt },
        death: { type: GraphQLInt },
        hospitalized: { type: GraphQLInt },
        totalTestResults: { type: GraphQLInt },
        dateChecked: { type: GraphQLString }
    })
})

const CountyLatestDataType = new GraphQLObjectType({
    name: "CountyLatestData",
    fields: () => ({
        id: { type: GraphQLInt },
        country: { type: GraphQLString },
        country_code: { type: GraphQLString },
        country_population: { type: GraphQLInt },
        province: { type: GraphQLString },
        county: { type: GraphQLString },
        last_updated: { type: GraphQLString },
        coordinates: { type: CoordinateType},
        latest: { type: LatestType }
    })
})

const LinkPreviewDataType = new GraphQLObjectType({
    name: "LinkPreviewData",
    fields: () => ({
        url: { type: GraphQLString },
        title: { type: GraphQLString },
        siteName: { type: GraphQLString },
        description: { type: GraphQLString },
        images: { type: GraphQLString }
    })
})

const SourceDataType = new GraphQLObjectType({
    name: "SourceData",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString }
    })
})

const NewsLatestDataType = new GraphQLObjectType({
    name: "NewsLatestData",
    fields: () => ({
        source: { type: SourceDataType },
        author: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        url: { type: GraphQLString },
        urlToImage: { type: GraphQLString },
        publishedAt: { type: GraphQLString },
        content: { type: GraphQLString },
        preview: {type: LinkPreviewDataType}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        GlobalLatestData: {
            type: GlobalLatestDataType,
            async resolve(parent, args) {
                let data = await axios.get('http://api.coronastatistics.live/all')
                return (data ? data.data : null)
            }
        },
        CountriesLatestData: {
            type: new GraphQLList(CountryLatestDataType),
            async resolve(parent, args) {
                let data = await axios.get('http://api.coronastatistics.live/countries?sort=cases')
                return (data ? data.data : null)
            }
        },
        CountryLatestData: {
            type: CountryLatestDataType,
            args: {country: {type: GraphQLString}},
            async resolve(parent, args) {
                let data = await axios.get('http://api.coronastatistics.live/countries/' + args.country)
                return (data ? data.data : null)
            }
        },
        StatesLatestData: {
            type: new GraphQLList(StateLatestDataType),
            async resolve(parent, args) {
                let data = await axios.get('https://covidtracking.com/api/states')
                return (data ? data.data : null)
            }
        },
        CountiesLatestData: {
            type: new GraphQLList(CountyLatestDataType),
            async resolve(parent, args) {
                let data = await axios.get('https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=csbs')
                return (data ? data.data.locations : null)
            }
        },
        CountryBreakingNews: {
            type: new GraphQLList(NewsLatestDataType),
            args: {country: {type: GraphQLString}},
            async resolve(parent, args) {
                let data = await axios.get("https://newsapi.org/v2/top-headlines?country=" + encodeURI(args.country) + "&language=en&sortBy=publishedAt&apiKey=" + process.env.NEWS_API)
                if (data) {
                    for (let i = 0; i < data.data.articles.length; i++) {
                        try {
                            data.data.articles[i].preview = await getLinkPreview(data.data.articles[i].url)
                            data.data.articles[i].preview.images = data.data.articles[i].preview.images ? data.data.articles[i].preview.images[0] : ""
                        }
                        catch (err) {
                            console.log("Invalid news url:", data.data.articles[i].url)
                        }
                    }
                    return data.data.articles
                }
                return null
            }
        },
        WorldLatestNews: {
            type: new GraphQLList(NewsLatestDataType),
            async resolve(parent, args) {
                let data = await axios.get("https://newsapi.org/v2/everything?q=trump%20or%20covid%20or%20technology&language=en&sortBy=publishedAt&apiKey=" + process.env.NEWS_API)
                if (data) {
                    for (let i = 0; i < data.data.articles.length; i++) {
                        try {
                            data.data.articles[i].preview = await getLinkPreview(data.data.articles[i].url)
                            data.data.articles[i].preview.images = data.data.articles[i].preview.images ? data.data.articles[i].preview.images[0] : ""
                        }
                        catch (err) {
                            console.log("Invalid news url:", data.data.articles[i].url)
                        }
                    }
                    return data.data.articles
                }
                return null
            }
        },
        StateLatestNews: {
            type: new GraphQLList(NewsLatestDataType),
            args: {q: {type: GraphQLString}},
            async resolve(parent, args) {
                let data = await axios.get("https://newsapi.org/v2/everything?q=\"" + encodeURI(args.q) + "\"&language=en&sortBy=publishedAt&apiKey=" + process.env.NEWS_API_PERSONAL)
                console.log(data.data.totalResults)
                console.log(data.data.articles.length)
                if (data) {
                    for (let i = 0; i < data.data.articles.length; i++) {
                        try {
                            data.data.articles[i].preview = await getLinkPreview(data.data.articles[i].url)
                            data.data.articles[i].preview.images = data.data.articles[i].preview.images ? data.data.articles[i].preview.images[0] : ""
                        }
                        catch (err) {
                            console.log("Invalid news url:", data.data.articles[i].url)
                        }
                    }
                    return data.data.articles
                }
                return null
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})