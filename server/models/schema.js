const graphql = require('graphql');
const axios = require('axios');
const _ = require('lodash');

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
        }
        
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})