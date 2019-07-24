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
          <Router history={history}>
            <div className="App">
              <Route exact path="/" component={Start} />         
              <Route path="/admin/" component={Admin} />
              <Route path="/shop/" component={Shop}>
                  
              </Route>    
            </div>
          </Router>
        </Provider>
      </CookiesProvider>
    );
  }
}

export default withCookies(App);
