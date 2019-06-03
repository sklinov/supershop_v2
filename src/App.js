import React, { Component } from 'react';
import { Router, Route } from "react-router-dom";
import { createBrowserHistory} from "history";
import './App.css';

import Admin from "./components/admin/Admin"
import Shop from "./components/frontend/Shop"
// import Logo from "./components/frontend/Logo"
// import Category from "./components/frontend/Category"
// import Product from "./components/frontend/Product"
// import Header from "./components/frontend/Header"

import {Provider} from './Context';

const history = new createBrowserHistory();

class App extends Component {
   
  render() {
    return (
      <Provider>
        <Router history={history}>
          <div className="App">         
            <Route path="/admin/" component={Admin} />
            <Route path="/shop/" component={Shop}>
                {/* <Header match={this.props.match} />
                <Route exact path="/" component={Category} />
                <Route path="category/:id" component={Category} />
                <Route path="product/:id" component={Product} /> */}
            </Route>    
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
