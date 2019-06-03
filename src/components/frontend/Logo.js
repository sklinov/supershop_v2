import React, { Component } from 'react'
import '../../styles/logo.css';
import { Link } from "react-router-dom";

export default class Logo extends Component {
  render() {
    return (
      <div className="logo__container">
        <Link to="/shop/" className="link-nondecorated">
          <div className="logo__firstline">Super</div>
          <div className="logo__secondline">Shop</div>
        </Link>
      </div>
    )
  }
}
