const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLInt,
        GraphQLSchema,
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

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        GlobalLatestData: {
            type: GlobalLatestDataType,
            async resolve(parent, args) {
                let data = await axios.get('http://covid.delalify.com/api/latest')
                if (data.status == 200) {                
                    return data.data.response
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