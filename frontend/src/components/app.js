import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import Upload from './files/upload';
import Files from './files/files'
import HomePageContainer from './app/home/home_page_container';

import Splash from './splash/splash';
import Header from './app/header/header';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

import "../stylesheets/application.scss";

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
        <Route exact path="/upload" component={Upload} />
        <Route exact path='/files' component={Files}/>
        <Route path="/header-test" component={Header}/>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <ProtectedRoute exact path="/home" component={HomePageContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <AuthRoute exact path="/" component={Splash} />
    </Switch>
  </div>
);

export default App;