import React, { Component } from 'react'
import { Route } from "react-router-dom";
import Header from '../frontend/Header'
import Category from '../frontend/Category'
import Product from '../frontend/Product'
import Cart from '../frontend/Cart'

export default class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        //console.log(this.props.match.url);
        
        return (
            <div>
                    <Header match={this.props.match}/>
                    <Route exact path={`${this.props.match.url}/`} component={Category} />
                    <Route path={`${this.props.match.url}/category/:id`} component={Category} />
                    <Route path={`${this.props.match.url}/product/:id`} component={Product} />
                    <Route path={`${this.props.match.url}/cart`} component={Cart} />
            </div>
        )
    }
}
