// Core libraries
import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Components
import SideNav from './components/ui/SideNav/SideNav';
import Cards from './components/ui/Card/Cards';
import Table from './components/ui/Table/Table';
import Header from './components/ui/Header/Header';

// Apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
})

class App extends Component {
    state = {
        header: "WORLD"
    }

    render() {
        return (
            <ApolloProvider client={client}>
            <div>
            <SideNav />
            <div className="main">
                <Header header={this.state.header}/>
                <Cards />
                <Table />
            </div>
            </div>
        </ApolloProvider>
        )
    }
}

export default App;