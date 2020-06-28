import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
import AlertTemplate from 'react-alert-template-basic'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { ContextProvider } from './Context';


import AppBar from "./components/material_blocks/AppBar";
import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import Prospects from "./components/Prospects";
import Splash from "./components/Splash";
import Account from "./components/Account";
import Modal from "./components/material_blocks/Modal";
import Home from "./components/Home";
import OnBoard from "./components/OnBoard";
import UploadFinal from "./components/PhotoUpload";
import SocketLayout from "./components/socket/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Success from './components/PTypeForm/Success';
import MatchArena from './components/MatchArena';





const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AlertProvider template={AlertTemplate} position={'middle'} >
        <ContextProvider>

        <Router history={history}>
          <header>
            {/* <AppBarFinal /> */}
            <AppBar />
          </header>
          <Switch>
            <Route path="/" exact component={Splash} />
            {/* <ProtectedRoute exact path="/mingle" render={(props) => <SocketLayout {...props} title='Socket Bossin' />} /> */}
            <ProtectedRoute exact path="/mingle" component={SocketLayout} />
            <ProtectedRoute exact path="/match" component={MatchArena} />
            <Route path="/modal" component={Modal} />
            <Route path="/onboard" component={OnBoard} />
            <Route exact path="/success" component={Success} />
            <Route path="/home" component={Home} />
            <Route path="/upload" component={UploadFinal} />
            <PrivateRoute
              exact
              path="/profile/:userId"
              render={(props) => <Profile {...props} />}
            />
            <PrivateRoute path="/account" component={Account} />
          </Switch>
        </Router>
        </ContextProvider>
      </AlertProvider>

    </ApolloProvider>
  );
}

export default App;
