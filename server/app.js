const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { ApolloServer } = require('apollo-server-express');

const schema = require('./models/schema')

const server = new ApolloServer({
	schema,
	playground: false,
	context: ({req, res}) => {
		return {
			request: req
		};
	}
});

// load env vars
dotenv.config({path: './config/config.env'});

const app = express();

// Body parser
app.use(express.json());

// Enable cors
app.use(cors({
	origin: true,
	credentials: true,
}));

server.applyMiddleware({
	app,
	path: '/graphql',
	cors: false,
});


// app.use('/graphql', (req,res,next)=>{
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Headers', 'content-type, authorization, content-length, x-requested-with, accept, origin');
//     res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
//     res.header('Allow', 'POST, GET, OPTIONS')
//     res.header('Access-Control-Allow-Origin', '*');
//     if (req.method === 'OPTIONS') {
//       res.sendStatus(200);
//     } else {
//       next();
//     }
//   }, graphqlHTTP({
//     schema,
//     graphiql: true
// }))

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('../client/build/index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))