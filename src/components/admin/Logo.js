import React, { Component } from 'react'

import { Link } from "react-router-dom";

export default class Logo extends Component {
  render() {
    return (
      <div className="adminmenu__logo">
        <Link to={process.env.PUBLIC_URL+"/admin/"} className="link-nondecorated">
          <div className="adminmenu__logo-line1">Super</div>
          <div className="adminmenu__logo-line2">Shop</div>
        </Link>
      </div>
    )
  }
}
