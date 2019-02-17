import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import HomePage from './Components/HomePage';
import SecondPage from './Components/SecondPage';

const SiteRoutes = () => (
  <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
    <App>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/SecondPage' component={SecondPage}/>
      </Switch>
    </App>
  </BrowserRouter>
  );

export default SiteRoutes;
