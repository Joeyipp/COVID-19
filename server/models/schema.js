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
        confirmed: { type: GraphQLInt },
        recovered: { type: GraphQLInt },
        deaths: { type: GraphQLInt },
        active: { type: GraphQLInt },
        lastUpdated: { type: GraphQLString }
    })
})

const CountryLatestDataType = new GraphQLObjectType({
    name: "CountryLatestData", 
    fields: () => ({
        confirmed: { type: GraphQLInt },
        confirmedToday: { type: GraphQLInt },
        recovered: { type: GraphQLInt },
        deaths: { type: GraphQLInt },
        deathsToday: { type: GraphQLInt },
        country: { type: GraphQLString },
        countryCode: { type: GraphQLString },
        confirmedByDay: { type: GraphQLList(GraphQLInt) },
        recoveredByDay: { type: GraphQLList(GraphQLInt) },
        lastUpdated: { type: GraphQLString },
        active: { type: GraphQLInt },
        critical: { type: GraphQLInt },
        mortalityPer: { type: GraphQLString },
        recoveredPer: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        GlobalLatestData: {
            type: GlobalLatestDataType,
            async resolve(parent, args) {
                let data = await axios.get('https://covid.delalify.com/api/latest')
                if (data.status == 200) {                
                    return data.data.response
                } else {
                    return data.data.message
                }
            }
        },
        CountriesLatestData: {
            type: new GraphQLList(CountryLatestDataType),
            async resolve(parent, args) {
                let data = await axios.get('https://covid.delalify.com/api/countries')
                if (data.status == 200) {
                    return data.data.response
                } else {
                    return data.data.message
                }
            }
        },
        CountryLatestData: {
            type: CountryLatestDataType,
            args: {country: {type: GraphQLString}},
            async resolve(parent, args) {
                let data = await axios.get('https://covid.delalify.com/api/countries')
                if (data.status == 200) {
                    return _.find(data.data.response, {country: args.country})
                } else {
                    return data.data.message
                }
            }
        }
        
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})