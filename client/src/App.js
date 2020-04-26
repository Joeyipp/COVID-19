// Core libraries
import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

// Components
import SideNav from './components/ui/SideNav/SideNav';
import Dashboard from './components/ui/Page/Dashboard';
import News from './components/ui/Page/News';

// Apollo client setup
const client = new ApolloClient({
    uri: '/graphql'
})

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <ApolloProvider client={client}>
                    <SideNav />
                    <Switch>
                        <Route exact path='/' component={Dashboard} />
                        <Route path='/news' component={News} />
                    </Switch>
                </ApolloProvider>
            </BrowserRouter>
        )
    }
}

export default App;