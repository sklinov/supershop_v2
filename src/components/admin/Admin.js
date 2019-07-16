import React, { Component } from 'react'
import { Route } from "react-router-dom";
import Menu from './Menu';
import Orders from './Orders';
import OrderEdit from './OrderEdit';
import Users from './Users';
import UserEdit from './UserEdit';
import Products from './Products';
import ProductEdit from './ProductEdit'
import Categories from './Categories';
import CategoryEdit from './CategoryEdit';

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
                <Route exact path={`${this.props.match.url}/orders/`} component={Orders} />
                <Route path={`${this.props.match.url}/orders/:id`} component={OrderEdit} />
                <Route exact path={`${this.props.match.url}/users/`} component={Users} />
                <Route path={`${this.props.match.url}/users/:id`} component={UserEdit} />
                <Route exact path={`${this.props.match.url}/products/`} component={Products} />
                <Route path={`${this.props.match.url}/products/:id`} component={ProductEdit} />
                <Route exact path={`${this.props.match.url}/categories/`} component={Categories} />
                <Route path={`${this.props.match.url}/categories/:id`} component={CategoryEdit} />
            </div>
        )
    }
}
