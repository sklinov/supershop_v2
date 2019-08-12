import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {Consumer} from '../../Context'

export default class LoginHeader extends Component {
  logOut = (dispatch, e) => {
    e.preventDefault();
    dispatch({
      type: "USER_LOGOUT",

    });
  }
  render() {
    return (
      <Consumer>
      {
        value => {
          const {user, loggedIn, dispatch} = value;
          if(loggedIn) {
            return (
              <div className="login__container">
                <Link to={process.env.PUBLIC_URL+"/shop/profile"} className="login__enter">{user.email}</Link>
                <p className="link" style={{marginTop: '0px' }} onClick={this.logOut.bind(this, dispatch)}>Выйти</p>
              </div>
            )
          }
          else {
            return (
              <div className="login__container">
                <Link to={process.env.PUBLIC_URL+"/shop/login"} className="login__enter" > Войти </Link>
                <span>&nbsp;&nbsp;</span>
                <Link to={process.env.PUBLIC_URL+"/shop/signup"} className="login__register"> Регистрация </Link>
              </div>
            )
          }   
        }
      }
      </Consumer>
    )
  }
}
