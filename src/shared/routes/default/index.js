import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import LandingPage from "../../../ui/authentication/pages/LandingPage";
import LoginPage from "../../../ui/authentication/pages/LoginPage";
import RegisterPage from "../../../ui/authentication/pages/RegisterPage";
import ValidatePage from "../../../ui/authentication/pages/ValidatePage";
import NewPassPage from "../../../ui/authentication/pages/NewPassPage";

function DefaultSwitch() {
    return (
        <Switch>
            <Route exact path='/'> <LandingPage/> </Route>
            <Route exact path='/login'> <LoginPage/> </Route>
            <Route exact path='/register'> <RegisterPage/> </Route>
            <Route exact path='/validate'> <ValidatePage/> </Route>
            <Route path='/newpassword/:token' component={NewPassPage}></Route>
            <Redirect to="/" />
        </Switch>
    )
}

export default DefaultSwitch;
