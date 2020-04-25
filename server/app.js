const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./models/schema')

// load env vars
dotenv.config({path: './config/config.env'});

const app = express();

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());

app.use('/graphql', cors(), graphqlHTTP({
    schema
    // graphiql: true
}))

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('../client/build/index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))