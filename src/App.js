import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
import AlertTemplate from 'react-alert-template-basic'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'


import NavBar from "./components/NavBar";
import AppBar from "./components/material_blocks/AppBar";
import AppBar2 from "./components/material_blocks/AppBar2";
import AppBarFinal from "./components/AppBarFinal";
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
import ProfileUpload from "./components/ProfileUpload";
import ProfileUpload2 from "./components/ProfileUpload2";
import StyledUpload from "./components/StyledUpload";
import UploadFinal from "./components/PhotoUploadFinal";
import SocketLayout from "./components/socket/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Success from './components/Success';





const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
        <AlertProvider template={AlertTemplate} position={'middle'} >

      <Router history={history}>
        <header>
          {/* <AppBarFinal /> */}
          <AppBar />
        </header>
        <Switch>
          <Route path="/" exact component={Splash} />
          <Route path="/socket" exact render={(props) => <SocketLayout {...props} title='Socket Bossin'/>}/>
          <Route path="/typingForm" exact component={TypingForm} />
          <ProtectedRoute path="/match" exact component={Prospects} />
          <Route path="/modal" component={Modal} />
          <Route path="/onboard" component={OnBoard} />
          <Route path="/userForm" component={UserForm} />
          <Route exact path="/success" component={Success}/>
          <Route path="/home" component={Home} />
          <Route path="/upload" component={UploadFinal} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/account" component={Account} />
        </Switch>
      </Router>
      </AlertProvider>

    </ApolloProvider>
  );
}

export default App;
