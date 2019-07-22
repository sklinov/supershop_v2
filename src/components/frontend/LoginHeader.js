import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {Consumer} from '../../Context'

export default class LoginHeader extends Component {
  render() {
    return (
      <Consumer>
      {
        value => {
          const {user, loggedIn} = value;
          if(loggedIn) {
            return (
              <div className="login__container">
                <Link to="/shop/profile" className="login__enter">{user.email}</Link>
              </div>
            )
          }
          else {
            return (
              <div className="login__container">
                <Link to="/shop/login" className="login__enter" > Войти </Link>
                <span>&nbsp;&nbsp;</span>
                <Link to="/shop/signup" className="login__register"> Регистрация </Link>
              </div>
            )
          }   
        }
      }
      </Consumer>
    )
  }
}
