import React, { Component } from 'react'
import Menu from '../frontend/Menu'
import Logo from '../frontend/Logo';
import Login from '../frontend/Login';
import CartInHeader from '../frontend/CartInHeader';
import '../../styles/header.css'; 

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="header">
              <Logo />
              <Menu match={this.props.match}/>
              <div className="container-column">
                <Login />
                <CartInHeader />
              </div>
            </div>
        )
    }
}
