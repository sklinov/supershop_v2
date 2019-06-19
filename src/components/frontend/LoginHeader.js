import React, { Component } from 'react'
import {Link} from "react-router-dom"

export default class LoginHeader extends Component {
  render() {
    return (
      <div className="login__container">
        <Link to="/" className="login__enter" > Войти </Link>
        <span>&nbsp;&nbsp;</span>
        <Link to="/" className="login__register"> Регистрация </Link>
      </div>
    )
  }
}
