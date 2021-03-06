import React, {useContext, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import './App.css';
import createAuth0Client from '@auth0/auth0-spa-js';
import {Auth0Context} from './contexts/auth0-context'

export default function App() {
  const auth0 = useContext(Auth0Context)
  console.log(auth0)
  
  // useEffect(()=>{

  //   initAuth0()

  //   async function initAuth0(){
  //     const auth0 = await createAuth0Client({
  //       domain: 'dev-2g4o78n1.us.auth0.com',
  //       client_id: '4XA9X9jCVzYeG9zaO5SAn2mRCC0omVO0'
  //     });

  //     const isAuthenticated = await auth0.isAuthenticated();
  //     const user = await auth0.getUser()
  //     console.log(isAuthenticated)
  //     console.log(user)
  //   }

  // },[])

  return (
    <Router>
      <div className="app">
        {/* site header */}
        <SiteHeader />

        {/* routes */}
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/" exact={true}>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
