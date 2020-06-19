import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'

import NavBar from "./components/NavBar";
import AppBar from "./components/material_blocks/AppBar"
import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import ExternalApi from "./views/ExternalApi";
import Radio from "./components/material_blocks/Radio";
import TypingForm from "./components/TypingForm";

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <header>
          <AppBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <Route path="/radio" exact component={Radio} />
          <Route path="/typingForm" exact component={TypingForm} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/external-api" component={ExternalApi} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
