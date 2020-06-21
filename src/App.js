import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'

import NavBar from "./components/NavBar";
import AppBar from "./components/material_blocks/AppBar";
import AppBar2 from "./components/material_blocks/AppBar2";
import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import ExternalApi from "./views/ExternalApi";
import Radio from "./components/material_blocks/Radio";
import TypingForm from "./components/TypingForm";
import Prospects from "./components/Prospects";
import Splash from "./components/Splash";
import Account from "./components/Account";
import Modal from "./components/material_blocks/Modal";
import Grid from "./components/material_blocks/Grid";
import UserForm from "./components/UserForm";
import Home from "./components/Home";
import OnBoard from "./components/OnBoard";


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
          <Route path="/" exact component={Splash} />
          <Route path="/typingForm" exact component={TypingForm} />
          <Route path="/match" exact component={Prospects} />
          <Route path="/modal" component={Modal} />
          <Route path="/onboard" component={OnBoard} />
          <Route path="/userForm" component={UserForm} />
          <Route path="/home" component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/account" component={Account} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
