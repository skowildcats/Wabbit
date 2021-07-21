import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import Upload from './files/upload';
import Files from './files/files'
import HomePageContainer from './app/home/home_page_container';

import Header from './app/header/header';
import Splash from './splash/splash';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

import "../stylesheets/application.scss";

const App = () => (
  <div id="app">
    <NavBarContainer />
    <Switch>
        <Route path="/upload" component={Upload} />
        <Route path='/files' component={Files}/>
        <Route path="/header-test" component={Header}/>
        <AuthRoute path="/login" component={LoginFormContainer} />
        <ProtectedRoute path="/home" component={HomePageContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <Route path="/" component={Splash} />
    </Switch>
  </div>
);

export default App;