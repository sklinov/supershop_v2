import React, { Component } from 'react'
import { Route } from "react-router-dom";
import Menu from './Menu';
import Orders from './Orders';
import Users from './Users';
import Products from './Products';
import Categories from './Categories';
import CategoryEditing from './CategoryEditing';

import '../../styles/admin/admin.css';

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="container">
                <Menu />
                <Route path={`${this.props.match.url}/orders/`} component={Orders} />
                <Route path={`${this.props.match.url}/users/`} component={Users} />
                <Route path={`${this.props.match.url}/products/`} component={Products} />
                <Route exact path={`${this.props.match.url}/categories/`} component={Categories} />
                <Route path={`${this.props.match.url}/categories/:id`} component={CategoryEditing} />
            </div>
        )
    }
}
