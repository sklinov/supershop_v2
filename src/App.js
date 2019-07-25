import React, { Component } from 'react';
import { Router, Route } from "react-router-dom";
import { createBrowserHistory} from "history";
import { CookiesProvider, withCookies } from 'react-cookie'
import './App.css';

import Admin from "./components/admin/Admin"
import Shop from "./components/frontend/Shop"
import Start from './components/frontend/Start';

import {Provider} from './Context';

const history = new createBrowserHistory();

class App extends Component {
   
  render() {
    return (
      <CookiesProvider>
        <Provider>
          <Router history={history} basename={'/supershop'}>
            <div className="App">
              <Route exact path={`${process.env.PUBLIC_URL}/`} component={Start} />         
              <Route path={`${process.env.PUBLIC_URL}/admin/`} component={Admin} />
              <Route path={`${process.env.PUBLIC_URL}/shop/`} component={Shop}>
                  
              </Route>    
            </div>
          </Router>
        </Provider>
      </CookiesProvider>
    );
  }
}

export default withCookies(App);
