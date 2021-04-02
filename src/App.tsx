import React, {useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Home} from './pages/Home/Home';
import {SignUp} from './pages/SignUp/SignUp';
import {SignIn} from './pages/SignIn/SignIn';
import {TokenContext} from './context/TokenContext'

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    return (
        <TokenContext.Provider value={{token, setToken}}>
            <Router>
                <Switch>
                    <Route path="/signUp">
                        <SignUp/>
                    </Route>
                    <Route path="/signIn">
                        <SignIn/>
                    </Route>
                    <Route path="/">
                        {token ? <Home/> : <Redirect to="/signIn"/>}
                    </Route>
                </Switch>
            </Router>
        </TokenContext.Provider>
    );
}

export {App};
