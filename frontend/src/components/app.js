import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import MetricsContainer from './app/metrics/metrics_container';
import HomePageContainer from './app/home/home_page_container';
import Splash from './splash/splash';
import About from './splash/about';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

import "../stylesheets/application.scss";

const App = () => (
  <div id="app">
    <NavBarContainer />
    <Switch>
        <ProtectedRoute path='/metrics' component={MetricsContainer} />
        <ProtectedRoute path="/home" component={HomePageContainer} />
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <Route path="/about" component={About} />
        <Route path="/" component={Splash} />
    </Switch>
  </div>
);

export default App;