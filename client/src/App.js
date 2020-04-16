// Core libraries
import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Components
import SideNav from './components/ui/SideNav';
import Dashboard from './components/ui/Dashboard';

// Apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <SideNav />
        <Dashboard />
      </div>
    </ApolloProvider>
  );
}

export default App;