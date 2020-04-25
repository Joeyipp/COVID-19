// Core libraries
import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

// Components
import SideNav from './components/ui/SideNav/SideNav';
import Dashboard from './components/ui/Page/Dashboard';

// Apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:5000'
})

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <ApolloProvider client={client}>
                    <div>
                        <SideNav />
                        <Switch>
                            <Route exact path='/' component={Dashboard} />
                        </Switch>
                    </div>
                </ApolloProvider>
            </BrowserRouter>
        )
    }
}

export default App;